import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  setItem(item, data) {
    localStorage.setItem(item, data);
  }

  getLocalItem(item) {
    return localStorage.getItem(item);
  }

  removeItem(item) {
    localStorage.removeItem(item);
  }
}
