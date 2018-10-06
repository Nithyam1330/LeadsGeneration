import { Directive } from '@angular/core';
import {NG_VALIDATORS, Validator, FormControl, ValidationErrors} from '@angular/forms';
@Directive({
  selector: '[emailValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true}]
})
export class EmailValidatorDirective implements Validator{
validate(f: FormControl): ValidationErrors {
  const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(f.value);
  const message = {
    'emailValidator': {
      message: 'Please Enter Valid Email'
    }
  }
  return isValidEmail ? null : message;
}
}