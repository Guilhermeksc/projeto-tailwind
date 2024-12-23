import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface LoginResponse {
  token: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8000/api'; // URL do backend Django

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login/`, { email, password }).pipe(
        tap((response) => {
            sessionStorage.setItem('auth-token', response.token);
            sessionStorage.setItem('username', response.name);
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

    // Validar o token no backend Django
    return this.http.post<boolean>(`${this.apiUrl}/validate-token/`, { token });
  }

  getAuthToken(): string | null {
    return sessionStorage.getItem('auth-token');
  }
}
