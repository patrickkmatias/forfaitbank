import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';

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

  form: FormGroup | undefined;

  cpfMask = createMask('999.999.999-99');

  constructor() { }

  ngOnInit(): void {

    this.initRegisterForm();

    if(this.isEditMode) {
      this.setupEditMode();
    }
  }

  initRegisterForm() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      "street-address": new FormControl(null, [Validators.required]),
      cpf: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    })
  }

  setupEditMode() {
    document.querySelector('button')!.innerText = 'Editar conta';
  }

  closeForm() {
    this.closeFormEvent.emit(true)
  }

  submitForm() {
    console.log(this.form!.value)
  }

}
