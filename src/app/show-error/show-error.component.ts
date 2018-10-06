import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-show-error',
  templateUrl: './show-error.component.html',
  styleUrls: ['./show-error.component.css']
})
export class ShowErrorComponent{

  private static readonly errorMessages = {
    'required': () => 'Field is required',
    'minlength': (params) => 'Min ' + params.requiredLength + ' characters is required' ,
    'maxlength': (params) => 'Max ' + params.requiredLength + ' characters is required' ,
    'pattern': (params) => 'Please Enter Valid' + params.message,
    'telephoneNumber': (params) => params.message,
    'emailValidator': (params) => params.message
    // 'years': (params) => params.message,
    // 'countryCity': (params) => params.message,
    // 'uniqueName': (params) => params.message,
    // 'telephoneNumbers': (params) => params.message,
  };
 
  @Input()
  public control: AbstractControlDirective | AbstractControl;
 
  shouldShowErrors(): boolean {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }
 
  listOfErrors(): string[] {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
  }
 
  private getMessage(type: string, params: any) {
    return ShowErrorComponent.errorMessages[type](params);
  }

}
