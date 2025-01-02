import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ControleProcessosService {
  private apiUrl = `${environment.apiUrl}controle-processos/`;

  constructor(private http: HttpClient) {}

  getProcessos(): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`, // Token armazenado
    });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  addProcesso(processo: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`, // Token armazenado
    });
    return this.http.post<any>(this.apiUrl, processo, { headers });
  }
  
}