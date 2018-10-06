import { Component, OnInit } from '@angular/core';
import {FormCompanyModel} from './formcompany.model';
import { Router } from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import {URLS} from '../URLS.enum';
@Component({
  selector: 'app-formcompany',
  templateUrl: './formcompany.component.html',
  styleUrls: ['./formcompany.component.css']
})
export class FormcompanyComponent implements OnInit {
  today: any;
  formData: FormCompanyModel;
  constructor(
    private router: Router,
    private db: AngularFireDatabase) {
      this.today = new Date().toISOString().split('T')[0];

  }
  ngOnInit() {
    this.initFormCompanyModel();
  }

  initFormCompanyModel() {
    this.formData = new  FormCompanyModel();
  }
  
save(){

    let url = URLS.CORPORATE;
  this.db.list(url).push(this.formData).then(res => {
    this.router.navigate(['listCompany']);
});
}
}
