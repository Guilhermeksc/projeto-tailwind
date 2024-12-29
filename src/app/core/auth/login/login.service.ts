// src/app/core/auth/login/login.service.ts

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface LoginResponse {
  token: string;
  username: string;
  is_active: boolean; // Adicionado para validar o e-mail
}

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  private apiUrl = `${environment.apiUrl}login/`; // Endpoint de login no backend

  constructor(private http: HttpClient) {}

  // Método para obter o CSRF Token
  private getCsrfToken(): string | null {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith('csrftoken='))
      ?.split('=')[1] || null;
  }
    
  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.getCsrfToken() || '',
    });
  
    console.log('DEBUG: Enviando requisição de login para o backend.'); // Log antes da requisição
  
  
    return this.http
      .post<any>(
        this.apiUrl,
        { username, password },
        { headers }
      )
      .pipe(
        tap((response) => {
          console.log('DEBUG: Resposta do backend:', response); // Log da resposta do backend

          sessionStorage.setItem('auth-token', response.token);
          sessionStorage.setItem('username', response.username);
          sessionStorage.setItem('is_active', response.is_active.toString());
          sessionStorage.setItem('uasg', response.uasg || '');
        }),
        catchError((error) => {
          console.error('Erro no login:', error);
          return throwError(() => new Error(error.error?.message || 'Falha ao autenticar. Verifique suas credenciais.'));
        })
      );
  }
  

  logout(): void {
    sessionStorage.clear(); // Limpa dados do usuário ao deslogar
    window.location.href = '/inicio'; // Redireciona para a página de início
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('auth-token');
    return !!token; // Retorna verdadeiro se o token existe
  }

  isEmailValidated(): boolean {
    const isActive = sessionStorage.getItem('is_active');
    return isActive === 'true'; // Verifica o status do e-mail
  }

  getAuthToken(): string | null {
    return sessionStorage.getItem('auth-token');
  }

  getUasg(): string | null {
    return sessionStorage.getItem('uasg');
  }
}