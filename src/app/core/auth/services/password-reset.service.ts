import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordResetService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  sendResetLink(email: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-CSRFToken': this.getCSRFToken(), // Inclui o token CSRF
    });

    return this.http.post(`${this.apiUrl}/password-reset/`, { email }, { headers });
  }

  private getCSRFToken(): string {
    const name = 'csrftoken';
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === name) {
        return value;
      }
    }
    return '';
  }

  resetPassword(token: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-CSRFToken': this.getCSRFToken(),
    });
  
    return this.http.post(`${this.apiUrl}/reset-password/${token}/`, { password }, { headers });
  }
  
}

