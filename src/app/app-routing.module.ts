import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { FormcompanyComponent } from './formcompany/formcompany.component';
import { ListcompanyComponent } from './listcompany/listcompany.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './auth.service';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthService]
  },
  {
    path: 'form',
    component: FormComponent,
    canActivate: [AuthService]
  },
  {
    path: 'list',
    component: ListComponent,
    canActivate: [AuthService]
  },
  {
    path: 'formCompany',
    component: FormcompanyComponent,
    canActivate: [AuthService]
  },
  {
    path: 'listCompany',
    component: ListcompanyComponent,
    canActivate: [AuthService]
  },
  {
    path: 'register',
    component: RegisterComponent ,
  },
  {
    path: 'profile',
    component: ProfileComponent ,
    canActivate: [AuthService]
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
