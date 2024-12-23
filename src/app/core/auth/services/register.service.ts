import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'http://localhost:8000/api/register/';
  private validateEmailUrl = 'http://localhost:8000/api/validate-email/';

  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { name, email, password });
  }

  validateEmail(token: string): Observable<any> {
    return this.http.get(`${this.validateEmailUrl}${token}/`);
  }
}
