import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

  // Verifica se o usuário está autenticado
  canActivate(): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      return true;
    }

    // Redireciona para login se não estiver autenticado
    this.router.navigate(['/inicio']);
    return false;
  }

  // Protege rotas filhas
  canActivateChild(): boolean {
    return this.canActivate();
  }
}
