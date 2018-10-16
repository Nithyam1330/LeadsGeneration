import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Profile } from './profile.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { URLS } from '../URLS.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  registerFormGroup: FormGroup;
  profile: Profile;
  alreadyChecked = false;
  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.initProfile();
  }

  initProfile() {
    this.registerFormGroup = new FormGroup({
      id: new FormControl(),
      oldpassword: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),
    });
  }

  changePassword() {
    if (this.registerFormGroup.valid) {
      this.profile = this.registerFormGroup.value;
      this.db.list(URLS.REGISTRATION).snapshotChanges().subscribe(res => {
        if (this.alreadyChecked === false) {
          const index = res.findIndex(
            (x => (x.payload.val()['id'] === this.profile.id && x.payload.val()['password'] === this.profile.oldpassword)));
          if (this.alreadyChecked === false) {
            if (index !== -1) {
              if (this.profile.password === this.profile.confirmPassword) {
                this.updateChanges(res[index].key);
              } else {
                alert('Both Password did not match');
              }
          } else {
            alert('User name or password may be wrong');
            this.initProfile();
          }
          }
        }
      });
    } else {
      alert('form is not valid');
    }
  }

  updateChanges(key) {
    this.alreadyChecked = true;
    this.db.list(URLS.REGISTRATION).update(key, {confirmPassword: this.profile.confirmPassword, password: this.profile.password})
    .then(res => {
      alert('Updated successfully');
    }).catch(e => {
      alert('Update failed');
    });
  }

}
