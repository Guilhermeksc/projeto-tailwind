// src/app/core/auth/reset-password/reset-password.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  private apiUrl = `${environment.apiUrl}reset-password/`; // Certifique-se de que o prefixo está correto

  constructor(private http: HttpClient) {}

  resetPassword(token: string, newPassword: string): Observable<any> {
    const url = `${this.apiUrl}${token}/`; // Adiciona o token à URL
    console.log('URL para redefinir senha:', url); // Log da URL
    console.log('Dados enviados:', { new_password: newPassword }); // Log dos dados
    return this.http.post(url, { new_password: newPassword }); // Envia o POST
  }
}
