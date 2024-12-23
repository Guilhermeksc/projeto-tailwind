import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordResetService {
  private resetUrl = 'http://localhost:8000/api/password-reset/'; // Substitua pela URL real do backend

  constructor(private http: HttpClient) {}

  sendResetLink(email: string): Observable<any> {
    return this.http.post(this.resetUrl, { email });
  }
}
