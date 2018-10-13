import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {AngularFireDatabase} from 'angularfire2/database';
import {Login} from './login.model';
import { URLS } from '../URLS.enum';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { LOCAL_STORAGE_ENUM } from '../enums/localstorage.enum';
import { AuthService } from '../auth.service';
import { Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  login: Login;
  constructor(private db: AngularFireDatabase, private router: Router,
    private localStorageService: LocalStorageService,
    private authService: AuthService) { }

  ngOnInit() {
    this.initFormGroup();
    this.removeLocalStorageData();
  }
  initFormGroup() {
    this.loginForm = new FormGroup({
      username: new FormControl( '', Validators.required),
      password: new FormControl()
    });
  }

  submitLogin() {
    this.login = this.loginForm.value;
    if (this.loginForm.valid) {
      const URL = URLS.REGISTRATION;
      this.db.list(URL).snapshotChanges().subscribe(res => {
        const index = res.findIndex(
        (x => (x.payload.val()['username'] === this.login.username || x.payload.val()['email'] === this.login.username)));
        if (index === -1) {
          alert('No user Exist');
          this.initFormGroup();
        } else {
          if (res[index].payload.val()['password'] === this.login.password) {
            this.localStorageService.setItem(LOCAL_STORAGE_ENUM.USERNAME, this.login.username);
            this.authService.isAuthenticated = true;
            this.router.navigate(['dashboard']);
          } else {
            alert('username or password is wrong');
          }
        }
      });
    } else {
      alert('login form is invalid');
    }
  }
  removeLocalStorageData() {
    const localStorageKeys = Object.values(LOCAL_STORAGE_ENUM);
    this.localStorageService.removeAllItems(localStorageKeys);
  }
}