import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Package } from 'src/app/models/package.model';
import { validateBillsValidator } from './validate-bills.validator';
import { Operation } from 'src/app/models/operation.model';
import { User } from 'src/app/models/user.model'

@Component({
  selector: 'app-operation-form',
  templateUrl: './operation-form.component.html',
  styles: ['div#packagesContainer::-webkit-scrollbar{display: none}'],
})
export class OperationFormComponent implements OnInit {
  /**
   * Form with bills. It is valid only
   * when any bill is selected.
   *
   * @type {FormGroup}
   * @memberof OperationFormComponent
   */
  bills: FormGroup = new FormGroup(
    {
      bill10: new FormControl<boolean>(false),
      bill50: new FormControl<boolean>(false),
      bill100: new FormControl<boolean>(false),
    },
    validateBillsValidator()
  );

  form: FormGroup = new FormGroup({
    name: new FormControl<string>('Operação 1', [Validators.required]),
    value: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1000),
    ]),
    bills: this.bills,
  });


  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  /**
   * It toggles the value of the bill in the bills form
   * between true and false and also the background col
   * or of the selected bill button.
   *
   * @param {string} bill Selected bill.
   * @memberof OperationFormComponent
   */
  toggleBill(bill: string): void {
    let value: boolean = this.bills.get(`bill${bill}`)!.value;

    for (let ctrl in this.bills.controls) {
      if (ctrl != `bill${bill}`) {
        this.bills.controls[ctrl].setValue(false);
        this.renderer.removeClass(
          document.querySelector(`#${ctrl}`),
          '!bg-emerald-600'
        );
      }
    }

    this.bills.controls[`bill${bill}`].setValue(!value);

    !value
      ? this.renderer.addClass(
          document.querySelector(`#bill${bill}`),
          '!bg-emerald-600'
        )
      : this.renderer.removeClass(
          document.querySelector(`#bill${bill}`),
          '!bg-emerald-600'
        );
  }

  generatePackages() {
    this.form.get('value')?.valueChanges.subscribe((value) => {
      console.log('value has changed', value);

      if (value >= 1000) {

      }

    });
  }

  submitForm() {
    console.log(this.form.value);
  }
}
