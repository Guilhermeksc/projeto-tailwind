import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PasswordChangeService {
  private apiUrl = `${environment.apiUrl}password-change/`;

  constructor(private http: HttpClient) {}

  changePassword(oldPassword: string, newPassword: string, confirmPassword: string): Observable<any> {
    const token = sessionStorage.getItem('auth-token'); // Obtém o token JWT
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
    });
  
    const payload = {
      old_password: oldPassword,
      new_password1: newPassword,
      new_password2: confirmPassword,
    };
  
    console.log('Payload enviado:', payload); // Log para depuração
  
    return this.http.post(this.apiUrl, payload, { headers });
  }
}