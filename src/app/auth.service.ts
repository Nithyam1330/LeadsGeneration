import { Injectable } from '@angular/core';
import {RouterStateSnapshot, ActivatedRouteSnapshot, Router} from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';
import { LOCAL_STORAGE_ENUM } from './enums/localstorage.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  constructor(private localStorageService: LocalStorageService, private router: Router) {
    console.log(this.router.url);
    if (this.router.url !== '/login' && this.router.url !== '/register' && this.router.url !== '404') {
      this.isAuthenticated = this.localStorageService.getLocalItem(LOCAL_STORAGE_ENUM.USERNAME) ? true : false;
    } else {
      this.isAuthenticated = false;
    }
  }

    canActivate(routerStateSnapshot: RouterStateSnapshot,
      activatedRouteSnapshot: ActivatedRouteSnapshot) {
        if (this.isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
    }
}
