import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormModel } from './form.model';
import { Router, ActivatedRoute } from '@angular/router';
import { URLS } from '../URLS.enum';
import { LOCAL_STORAGE_ENUM } from '../enums/localstorage.enum';
import { LocalStorageService } from '../services/local-storage.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  today: any;
  formData: FormModel;
  isEdit = false;
  editableKey: string;
  constructor(
    private router: Router,
    private db: AngularFireDatabase,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.editableKey = params['random'];
      if (this.editableKey !== undefined && this.editableKey !== null && this.editableKey !== '') {
        this.isEdit = true;
      } else {
        this.isEdit = false;
        this.initFormModel();
      }
    });
    this.today = new Date().toISOString().split('T')[0];
  }

  ngOnInit() {
    this.initFormModel();
    if (this.isEdit === true) {
      const url = URLS.LEADS_CREATOR + this.editableKey;
      console.log(url);
      this.db.object(url).snapshotChanges().subscribe(res => {
        this.formData = <FormModel>res.payload.val();
      });
    } else {
      this.initFormModel();
    }
  }
  initFormModel() {
    this.formData = new FormModel();
  }

  save() {
    if (this.isEdit === true) {
      this.update();
    } else {
      const url = URLS.LEADS_CREATOR;
    this.formData.employeeName = this.localStorageService.getLocalItem(LOCAL_STORAGE_ENUM.USERNAME);
    this.db.list(url).push(this.formData).then(res => {
      this.router.navigate(['list']);
    });
    }
  }

  update() {
    const url = URLS.LEADS_CREATOR;
    this.db.list(url).update(this.editableKey, this.formData).then(res => {
      alert('success');
      this.router.navigate(['list']);
    });
  }
}
