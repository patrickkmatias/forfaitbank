import { ValidationErrors, ValidatorFn } from '@angular/forms';

export function validateBillsValidator(): ValidatorFn {
  return (form: any): ValidationErrors | null => {
    let b1 = form.get('bill10').value,
      b2 = form.get('bill50').value,
      b3 = form.get('bill100').value;

    if (b1 || b2 || b3) {
      return null;
    } else {
      return { notAnyBillSelected: true };
    }
  };
}
