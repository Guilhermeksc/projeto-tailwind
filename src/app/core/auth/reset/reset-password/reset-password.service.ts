// src/app/core/auth/reset-password/reset-password.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  private apiUrl = `${environment.apiUrl}password-reset-confirm`;

  constructor(private http: HttpClient) {}

  private getCsrfToken(): string | null {
    const csrfCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='));
    return csrfCookie ? csrfCookie.split('=')[1] : null;
  }

  resetPassword(uid: string, token: string, newPassword: string, confirmPassword: string): Observable<any> {
    const csrfToken = this.getCsrfToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken || '',
    });
  
    const payload = {
      new_password1: newPassword,
      new_password2: confirmPassword,
    };
  
    return this.http.post(`${this.apiUrl}/${uid}/${token}/`, payload, { headers });
  }
}