// src/app/core/auth/login/login.service.ts

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface LoginResponse {
  token: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}login/`, { username, password }).pipe(
      tap((response) => {
        sessionStorage.setItem('auth-token', response.token);
        sessionStorage.setItem('username', response.username);
      })
    );
  }


  logout(): void {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('username');
  }

  isAuthenticated(): Observable<boolean> {
    const token = sessionStorage.getItem('auth-token');
    if (!token) {
      return new Observable<boolean>((observer) => observer.next(false));
    }

    return this.http.post<boolean>(`${this.apiUrl}/validate-token/`, { token });
  }

  getAuthToken(): string | null {
    return sessionStorage.getItem('auth-token');
  }
}