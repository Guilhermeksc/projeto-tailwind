import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PasswordChangeService {
  private apiUrl = `${environment.apiUrl}change-password/`;

  constructor(private http: HttpClient) {}

  changePassword(
    email: string,
    currentPassword: string,
    newPassword: string,
    authToken: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`, // Token de autenticação
      'Content-Type': 'application/json',
    });

    console.log('Headers enviados:', headers);

    return this.http.post(
      this.apiUrl,
      { email, currentPassword, newPassword },
      { headers }
    );
  }
}