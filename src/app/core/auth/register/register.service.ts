// src/app/core/auth/register/register.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = environment.apiUrl;
  private validateEmailUrl = environment.validateEmailUrl;

  constructor(private http: HttpClient) {}

  // Registra o usuário
  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}register/`, { email, password });
  }

  // Valida o e-mail com o token recebido
  validateEmail(token: string): Observable<any> {
    return this.http.get(`${this.validateEmailUrl}${token}/`);
  }
}
