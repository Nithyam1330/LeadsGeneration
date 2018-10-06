import { Component, OnInit } from '@angular/core';
import {Registration} from './register.model';
import {AngularFireDatabase} from 'angularfire2/database';
import { URLS } from '../URLS.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

register: Registration;
registerURL = URLS.REGISTRATION;

  constructor(private db: AngularFireDatabase, private router: Router) { }

  ngOnInit() {
    this.initRegister();
  }

  submitRegistration() {
    // this.saveRegisteration();
    this.db.list(this.registerURL).snapshotChanges().subscribe(res => {
      const index = res.findIndex(x => x.payload.val()['email'] === this.register.email);
      if (index === -1) {
        this.saveRegisteration();
      } else {
        alert('already exist');
      }
    });
  }

  saveRegisteration() {
    this.db.list(this.registerURL).push(this.register).then(res => {
      this.router.navigate(['register']);
    });
  }

  initRegister() {
    this.register = new Registration();
  }
}
