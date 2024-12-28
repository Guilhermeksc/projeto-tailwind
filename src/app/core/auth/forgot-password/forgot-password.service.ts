// src/app/core/auth/forgot-password/forgot-password.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  private apiUrl = `${environment.apiUrl}forgot-password/`;

  constructor(private http: HttpClient) {}

  requestPasswordReset(email: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Define o tipo de conteúdo
    });
  
    console.log('E-mail enviado ao backend:', email);  // Verifique o que está sendo enviado
  
    return this.http.post(this.apiUrl, { email }, { headers });
  }
}