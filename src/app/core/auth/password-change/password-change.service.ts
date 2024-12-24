import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PasswordChangeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  changePassword(
    email: string,
    currentPassword: string,
    newPassword: string,
    authToken: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    return this.http.post(
      `${this.apiUrl}change-password/`,
      { email, currentPassword, newPassword },
      { headers }
    );
  }
}