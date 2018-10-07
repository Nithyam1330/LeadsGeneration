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
    this.isAuthenticated = this.localStorageService.getLocalItem(LOCAL_STORAGE_ENUM.USERNAME) ? true : false;
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
