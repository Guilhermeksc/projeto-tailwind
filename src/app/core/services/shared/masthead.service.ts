import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MastheadService {
  private showLogin = false;

  setShowLogin(show: boolean) {
    this.showLogin = show;
  }

  getShowLogin() {
    return this.showLogin;
  }
}
