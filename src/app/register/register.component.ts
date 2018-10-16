import { Component, OnInit } from '@angular/core';
import { Registration } from './register.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { URLS } from '../URLS.enum';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { LOCAL_STORAGE_ENUM } from '../enums/localstorage.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  alreadyChecked = false;
  register: Registration;
  registerURL = URLS.REGISTRATION;
  registerFormGroup: FormGroup;
  constructor(private db: AngularFireDatabase,
    private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.initRegister();
  }

  submitRegistration() {
    if (this.registerFormGroup.valid) {
      this.register = this.registerFormGroup.value;
      this.db.list(this.registerURL).snapshotChanges().subscribe(res => {
        if (this.alreadyChecked === false) {
          const index = res.findIndex(
            (x => (x.payload.val()['username'] === this.register.username || x.payload.val()['email'] === this.register.email || x.payload.val()['id'] === this.register.id )));
          if (index === -1) {
            if (this.register.password === this.register.confirmPassword) {
              this.localStorageService.setItem(LOCAL_STORAGE_ENUM.USERNAME, this.register.username);
              this.saveRegisteration();
            } else {
              alert('Confirm and password should be same');
            }
          } else {
            alert('already exist');
            this.initRegister();
          }
        }
      });
    } else {
      alert('form is not valid');
    }
  }


  saveRegisteration() {
    this.alreadyChecked = true;
    this.db.list(this.registerURL).push(this.register).then(res => {
      this.router.navigate(['dashboard']);
    });
  }

  initRegister() {
    this.register = new Registration();
    this.registerFormGroup = new FormGroup({
      username: new FormControl(),
      email: new FormControl(),
      id : new  FormControl(),
      password: new FormControl(),
     confirmPassword: new FormControl()
    });
  }
}
