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

  removeAllItems(items: any[]) {
    for (let i = 0; i < items.length ; i++) {
      this.removeItem(items[i]);
    }
  }
}
