import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appConfimValidation]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ConfimValidationDirective,
    multi: true
  }]
})
export class ConfimValidationDirective implements Validator {

  @Input() appConfimValidation: string;
  validate(control: AbstractControl): {[key: string]: any} | null {
    const controlToCompare = control.parent.get(this.appConfimValidation);
    if  (controlToCompare && controlToCompare.value !== control.value) {
      return {'notEqual': true};
    }
    return null;
  }

}
