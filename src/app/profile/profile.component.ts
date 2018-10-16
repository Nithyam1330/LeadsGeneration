import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  registerFormGroup: FormGroup;
  constructor() { }

  ngOnInit() {
    this.registerFormGroup = new FormGroup({
      username: new FormControl(),
      oldpassword: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),
    });
  }

}
