import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {FormModel} from './form.model';
import { Router } from '@angular/router';
import {URLS} from '../URLS.enum';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  today: any;
  formData: FormModel;
  constructor(
    private router: Router,
    private db: AngularFireDatabase) {
      this.today = new Date().toISOString().split('T')[0];
  }

  ngOnInit() {
    this.initFormModel();
  }

  initFormModel() {
    this.formData = new FormModel();
  }

  save() {
      const url = URLS.LEADS_CREATOR;
    this.db.list(url).push(this.formData).then(res => {
      this.router.navigate(['list']);
    });
  }
}
