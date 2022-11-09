import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  @Output() closeFormEvent = new EventEmitter();

  form!: FormGroup;

  constructor(
    public ui: UIFeedbackService,
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {

    gsap.from('form', {
      opacity: 0,
      duration: 1,
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

        this.ui.buttonLoading.dismiss(button);
        this.ui.feedback = 'success';
        this.ui.timer(3, () => this.router.navigate(['painel']));

      },
      error: (err: unknown) => {

        this.auth.logout();

        this.ui.buttonLoading.dismiss(button);
        this.ui.feedback = 'error';
        this.ui.timer(5, () => this.ui.feedback = undefined)

        console.log('ew, error', err);

      }
    }

    this.ui.buttonLoading.create(button);

    // send user data to Laravel API and returns a partial observer of the user
    this.auth.loginUser(this.form.value).pipe(take(1)).subscribe(subscribeResponse);

  }

  closeForm() {
    gsap.to('form', {
      opacity: 0,
      duration: 1,
      onComplete: () => this.closeFormEvent.emit(true)
    })
  }

}
