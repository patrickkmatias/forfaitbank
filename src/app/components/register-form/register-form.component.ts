import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';
import { take } from 'rxjs';
import { UIFeedbackService } from 'src/app/services/uifeedback.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  host: {
    class: 'w-full h-fit'
  }
})
export class RegisterFormComponent implements OnInit {

  @Input() isEditMode = false;
  @Output() closeFormEvent = new EventEmitter<boolean>();

  form!: FormGroup;
  cpfMask = createMask('999.999.999-99');
  
  constructor(
    public ui: UIFeedbackService,
    private auth: AuthenticationService, 
    ) { }

  ngOnInit(): void {

    gsap.from('form', {
      opacity: 0,
      duration: 1,
    })

    this.initRegisterForm();

    if(this.isEditMode) {
      this.setupEditMode();
    }
  }

  initRegisterForm() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      address: new FormControl(null, [Validators.required]),
      cpf: new FormControl(null, [Validators.required]),
      birthdate: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    })
  }

  setupEditMode(): void {
  }

  closeForm(): void {

    gsap.to('form', {
      opacity: 0,
      duration: 1,
      onComplete: () => this.closeFormEvent.emit(true)
    })

  }
  
  submitForm() {

    let button = document.querySelector('#submitButton')! as HTMLElement;

    /** Object with methods to setup UI feedback accordingly response. */
    let subscribeResponse = {
      complete: () => {

        this.ui.buttonLoading.dismiss(button);
        this.ui.feedback = 'success';
        this.ui.timer(5, this.closeForm.bind(this))

      },
      error: (err: unknown) => {

        this.ui.buttonLoading.dismiss(button);
        this.ui.feedback = 'error';
        this.ui.timer(5, () => this.ui.feedback = undefined)
        
        console.log('ew, error', err);

      }
    }

    this.ui.buttonLoading.create(button);

    // send user data to Laravel API and returns a partial observer of the user
    this.auth.registerUser(this.form.value).pipe(take(1)).subscribe(subscribeResponse);

  }

}
