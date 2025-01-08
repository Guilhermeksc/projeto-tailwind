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
      'X-CSRFToken': this.getCsrfToken() || '', // Inclui o token CSRF se necessário
    });
  
    console.log('DEBUG: Enviando requisição de login para o backend.');
  
    return this.http
      .post<any>(this.apiUrl, { username, password }, { headers })
      .pipe(
        tap((response) => {
          console.log('DEBUG: Resposta do backend:', response);
  
          // Verifique se os tokens estão presentes
          if (response.access && response.refresh) {
            sessionStorage.setItem('auth-token', response.access);
            sessionStorage.setItem('refresh-token', response.refresh);
          } else {
            throw new Error('Tokens ausentes na resposta do backend.');
          }
  
          // Armazena o username
          sessionStorage.setItem('username', username);
  
          // Armazena o unidade_compra como string
          if (response.unidade_compra !== undefined && response.unidade_compra !== null) {
            const unidade_compra = response.unidade_compra.toString(); // Converte para string
            sessionStorage.setItem('unidade_compra', unidade_compra);
            console.log('DEBUG: unidade_compra armazenado:', unidade_compra);
          } else {
            console.warn('unidade_compra não foi retornado pelo backend.');
            sessionStorage.setItem('unidade_compra', ''); // Armazena vazio caso ausente
          }
  
          // Armazena o status de ativação
          if (response.is_active !== undefined) {
            sessionStorage.setItem('is_active', response.is_active.toString());
            console.log('DEBUG: Status de ativação armazenado:', response.is_active);
          } else {
            console.warn('Status de ativação (is_active) não foi retornado pelo backend.');
          }
        }),
        catchError((error) => {
          console.error('Erro no login:', error);
  
          // Captura mensagens de erro do backend, se disponíveis
          const errorMessage =
            error.error?.message || 'Falha ao autenticar. Verifique suas credenciais.';
          return throwError(() => new Error(errorMessage));
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

  getunidade_compra(): string | null {
    const unidade_compra = sessionStorage.getItem('unidade_compra');
    console.log('DEBUG: unidade_compra retornado pelo LoginService:', unidade_compra);
    return unidade_compra;
  }
}