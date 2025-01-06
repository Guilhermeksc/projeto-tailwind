// src/app/core/auth/forgot-password/forgot-password.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  private apiUrl = `${environment.apiUrl}password-reset/`;

  constructor(private http: HttpClient) {}

  sendRecoveryEmail(username: string, email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, { username, email }, { headers });
  }
}