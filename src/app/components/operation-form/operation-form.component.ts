import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Package } from 'src/app/models/package.model';
import { validateBillsValidator } from './validate-bills.validator';

@Component({
  selector: 'app-operation-form',
  templateUrl: './operation-form.component.html',
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

  pkg = new Package(10, 30);
  pkg2 = new Package(50, 10);
  pkg3 = new Package(100, 48);

  constructor(private r: Renderer2) {}

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
    this.bills.controls[`bill${bill}`].setValue(!value);

    !value == true
      ? this.r.addClass(
          document.querySelector(`#bill${bill}`),
          '!bg-emerald-600'
        )
      : this.r.removeClass(
          document.querySelector(`#bill${bill}`),
          '!bg-emerald-600'
        );
  }

  submitForm() {
    console.log(this.form.value);
  }
}
