import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {AngularFireDatabase} from 'angularfire2/database';
import {Login} from './login.model';
import { URLS } from '../URLS.enum';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  login: Login;
  constructor(private db: AngularFireDatabase, private router: Router) { }

  ngOnInit() {
    this.initFormGroup();
  }
  initFormGroup() {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  submitLogin() {
    this.login = this.loginForm.value;
    if (this.loginForm.valid) {
      const URL = URLS.REGISTRATION;
      this.db.list(URL).snapshotChanges().subscribe(res => {
        const index = res.findIndex(x => x.payload.val()['email'] === this.login.username);
        if (index === -1) {
          alert('No user Exist');
          this.initFormGroup();
        } else {
          if (res[index].payload.val()['password'] === this.login.password) {
            this.router.navigate(['dashboard']);
          } else {
            alert('Email or password is wrong');
          }
        }
      })
    } else {
      alert('login form is invalid');
    }
  }
}
