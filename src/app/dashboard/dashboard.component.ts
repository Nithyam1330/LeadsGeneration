import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import { Router } from '@angular/router';
import {URLS} from '../URLS.enum';
import { LocalStorageService } from '../services/local-storage.service';
import { LOCAL_STORAGE_ENUM } from '../enums/localstorage.enum';
import { map } from 'rxjs/operators';
import { CheckInOut } from './dashboard.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  todayDate: string;
  key: string;
  checkInOut: CheckInOut;
  disableCheckout = false;
  constructor(
    private router: Router,
    private db: AngularFireDatabase,
  private localStorageService: LocalStorageService) {
  }

  createDate() {
    const date = new Date();
    this.todayDate = date.getDate().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getFullYear().toString();
    console.log(this.todayDate);
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }

  ngOnInit() {
    this.initChecOut();
    this.createDate();
    this.getKey();
  }

  initChecOut() {
    this.checkInOut = new CheckInOut();
  }
  checkIn() {
    if (this.getCheckInStatus()) {
      const url = URLS.LOGINTIME + this.todayDate;
      this.checkInOut = {
        username: this.localStorageService.getLocalItem(LOCAL_STORAGE_ENUM.USERNAME),
        checkInTime: this.getCurrentTime(),
        checkOutTime: ''
      };
    this.db.list(url).push(this.checkInOut).then(res => {
      // this.router.navigate(['form']);
      this.localStorageService.setItem(LOCAL_STORAGE_ENUM.CHECK_OUT_STATUS, false);
      alert('CHECKIN SUCCESSFULL');
    });
    } else {
      alert('Already checked in');
    }
}

getCheckInStatus() {
  if (this.localStorageService.getLocalItem(LOCAL_STORAGE_ENUM.CHECK_IN_STATUS) === '') {
    this.localStorageService.setItem(LOCAL_STORAGE_ENUM.CHECK_OUT_STATUS, false);
    return true;
  } else {
    return false;
  }
}

getCheckOut() {
  const key = this.localStorageService.getLocalItem(LOCAL_STORAGE_ENUM.CHECK_IN_STATUS);
  if (key !== undefined && key !== '' && key !== null) {
  const url = URLS.LOGINTIME + this.todayDate + '/' + key;
    this.db.list(url).snapshotChanges().subscribe(res => {
      const data = res[1].payload.val();
      if (data !== null && data !== undefined && data !== '') {
        this.localStorageService.setItem(LOCAL_STORAGE_ENUM.CHECK_OUT_STATUS, true);
      } else {
        this.localStorageService.setItem(LOCAL_STORAGE_ENUM.CHECK_OUT_STATUS, false);
      }
    });
  }
}

getCheckoutStatus() {
  if (this.localStorageService.getLocalItem(LOCAL_STORAGE_ENUM.CHECK_OUT_STATUS) === 'false') {
    return true;
  } else {
    return false;
  }
}

getKey() {
const url = URLS.LOGINTIME + this.todayDate;
  this.db.list(url).snapshotChanges().subscribe(res => {
    this.key = '';
    for (let i = 0; i < res.length; i++) {
      const data = res[i].payload.val();
      if (data['username'] === localStorage.getItem(LOCAL_STORAGE_ENUM.USERNAME)) {
        this.key = res[i].key;
        this.checkInOut.username = res[i].payload.val()['username'];
        this.checkInOut.checkInTime = res[i].payload.val()['checkInTime'];
        this.checkInOut.checkOutTime = res[i].payload.val()['checkOutTime'];
        break;
      }
    }
    this.localStorageService.setItem(LOCAL_STORAGE_ENUM.CHECK_IN_STATUS, this.key);
    this.getCheckOut();
  });
}
checkout() {
  const url = URLS.LOGINTIME + this.todayDate;
  this.checkInOut.checkOutTime = this.getCurrentTime();
  this.db.list(url).update(this.key, { checkOutTime : this.checkInOut.checkOutTime} ).then(res => {
    this.localStorageService.setItem(LOCAL_STORAGE_ENUM.CHECK_OUT_STATUS, true);
    this.disableCheckout = true;
    alert('Checkout successfull');
  });
}
getCurrentTime() {
  const d = new Date();
  return d.getHours().toString() + ':' + (d.getMinutes()).toString() + ':' + (d.getSeconds().toString());
}
}
