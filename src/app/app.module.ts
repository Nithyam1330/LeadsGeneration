import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { CustomsortServiceService } from './services/customsort-service.service';
import { NavComponent } from './nav/nav.component';
import { FormcompanyComponent } from './formcompany/formcompany.component';
import { ListcompanyComponent } from './listcompany/listcompany.component';
import { LoginComponent } from './login/login.component';
import { ShowErrorComponent } from './show-error/show-error.component';
import { EmailValidatorDirective } from './directives/EmailValidator';
import { PhoneNumberValidatorDirective } from './directives/PhoneNumberValidator';
import {LocalStorageService} from './services/local-storage.service';

import {
  MatCardModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfimValidationDirective } from './directives/confim-validation.directive';
import { AuthService } from './auth.service';
import { InoutComponent } from './inout/inout.component';


var config = {
  apiKey: 'AIzaSyAkDKb3P0npcMFTF07wG8V0JXLA9NeJF3Q',
  authDomain: 'leads-creator.firebaseapp.com',
  databaseURL: 'https://leads-creator.firebaseio.com',
  projectId: 'leads-creator',
  storageBucket: 'leads-creator.appspot.com',
  messagingSenderId: '882695494566'

};

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ListComponent,
    NavComponent,
    FormcompanyComponent,
    ListcompanyComponent,
    LoginComponent,
    ShowErrorComponent,
    DashboardComponent,
    ConfimValidationDirective,
    InoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ],
  providers: [
    CustomsortServiceService,
    EmailValidatorDirective,
    PhoneNumberValidatorDirective,
    LocalStorageService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
