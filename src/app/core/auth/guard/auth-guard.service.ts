import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = !!this.loginService.getAuthToken(); // Verifica o token de autenticação
    if (!isAuthenticated) {
      this.router.navigate(['/inicio']); // Redireciona para a página inicial ou de login
    }
    return isAuthenticated;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}