import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UIFeedbackService } from 'src/app/services/uifeedback.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [UIFeedbackService]
})
export class LoginFormComponent implements OnInit {

  @ViewChild('registerButton') rbutton!: ElementRef;
  @Output() closeFormEvent = new EventEmitter();

  form!: FormGroup;

  constructor(
    public ui: UIFeedbackService,
    private auth: AuthenticationService,
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {

    gsap.from('form', {
      opacity: 0,
      duration: 0.5,
    })

    this.initLoginForm();
  }

  initLoginForm() {
    this.form = new FormGroup({
      email: new FormControl(
          {value: '', disabled: false},[
            Validators.required,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
          ]
        ),
      password: new FormControl(
          {value: '', disabled: false},
          Validators.required
        ),
    });
  }

  submitForm() {

    let button = document.querySelector('#submitButton')! as HTMLElement;

    /** Object with methods to setup UI feedback accordingly response. */
    let subscribeResponse = {
      complete: () => {

        this.auth.login();

        this.renderer.removeAttribute(this.rbutton.nativeElement, 'disabled');
        this.ui.buttonLoading.dismiss(button);
        this.ui.feedback = 'success';
        this.ui.timer(3, () => this.router.navigate(['painel']));

      },
      error: (err: unknown) => {

        this.auth.logout();

        this.renderer.removeAttribute(this.rbutton.nativeElement, 'disabled');
        this.ui.buttonLoading.dismiss(button);
        this.ui.feedback = 'error';
        this.ui.timer(5, () => this.ui.feedback = undefined)

        console.log('ew, error', err);

      }
    }

    this.ui.buttonLoading.create(button);
    this.renderer.setAttribute(this.rbutton.nativeElement, 'disabled', '');

    // send user data to Laravel API and returns a partial observer of the user
    this.auth.loginUser(this.form.value).pipe(take(1)).subscribe(subscribeResponse);

  }

  closeForm() {
    gsap.to('form', {
      opacity: 0,
      duration: 0.5,
      onComplete: () => this.closeFormEvent.emit(true)
    })
  }

}
