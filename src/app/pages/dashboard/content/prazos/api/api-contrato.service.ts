import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiContratoService {
  private baseUrl = `${environment.apiUrl}consulta_comprasnet_contratos`;

  constructor(private http: HttpClient) {}

  getContratosByUasg(uasg: string): Observable<any> {
    const url = `${this.baseUrl}?uasg=${uasg}`; // Certifique-se de que a query string está correta
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(url, { headers });
  }
}
