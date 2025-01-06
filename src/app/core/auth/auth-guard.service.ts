// src/app/core/auth/auth-guard.service.ts

import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { LoginService } from './login/login.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(): boolean {
    const isAuthenticated = this.loginService.getAuthToken(); // Verifica o token de autenticação
  
    if (!isAuthenticated) {
      this.toastr.error('Você precisa estar autenticado para acessar essa área.', 'Erro');
      this.router.navigate(['/login']);
      return false;
    }
  
    const isActive = this.loginService.isEmailValidated();
    if (!isActive) {
      this.toastr.error('Por favor, valide seu e-mail antes de acessar essa área.', 'Erro');
      this.router.navigate(['/inicio']);
      return false;
    }
  
    return true;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
