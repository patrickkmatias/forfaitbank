import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
@Component({
  selector: 'app-operation-form',
  templateUrl: './operation-form.component.html',
  styles: ['div#packagesContainer::-webkit-scrollbar{display: none}'],
})
export class OperationFormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl<string>('Operação 1', [Validators.required]),
    value: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1000),
    ]),
    billType: new FormControl<number | null>(null, [Validators.required]),
  });

  @ViewChildren('bill10,bill50,bill100')
  bills!: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  toggleBill(billType: string): void {
    let activeClass = '!bg-emerald-600';

    this.bills.forEach((el) => {
      let bill = el.nativeElement as HTMLElement;
      let isSelectedBill =
        bill.getAttribute('id') == `bill${billType}` ? true : false;

      if (isSelectedBill) {
        this.renderer.addClass(bill, activeClass);
      } else {
        this.renderer.removeClass(bill, activeClass);
      }
    });

    this.form.get('billType')?.setValue(Number(billType));
  }

  submitForm() {
    console.log(this.form.value);
  }
}
