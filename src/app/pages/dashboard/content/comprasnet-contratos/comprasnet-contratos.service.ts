import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ComprasnetContratosService {
  private baseUrl = `${environment.apiUrl}comprasnet-contratos`;

  constructor(private http: HttpClient) {}

  getProcessos(): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`, // Token armazenado
    });
    return this.http.get<any[]>(this.baseUrl, { headers });
  }

  addProcesso(processo: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`, // Token armazenado
    });
    return this.http.post<any>(this.baseUrl, processo, { headers });
  }

  getContratosByUasg(uasg: string): Observable<any[]> {
    const url = `${this.baseUrl}?uasg=${uasg}`;
    const token = sessionStorage.getItem('auth-token');
  
    if (!token) {
      console.error('Token de autenticação não encontrado!');
      throw new Error('Token de autenticação não encontrado.');
    }
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  
    return this.http.get<any>(url, { headers }).pipe(
      map((response) => {
        console.log('Resposta completa da API:', response);
        if (response && response.data && Array.isArray(response.data)) {
          return response.data; // Extrai os dados do campo "data"
        } else {
          console.error('Resposta inesperada da API:', response);
          throw new Error('Resposta inválida da API.');
        }
      }),
      catchError((error) => {
        console.error('Erro ao obter contratos:', error);
        return throwError(() => new Error('Erro ao obter contratos.'));
      })
    );
  }   

atualizarContratos(): Observable<any> {
  const url = `${this.baseUrl}/update-comprasnet-contratos/`;
  const token = sessionStorage.getItem('auth-token');

  if (!token) {
    console.error('Token de autenticação não encontrado!');
    throw new Error('Token de autenticação não encontrado.');
  }

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });

  return this.http.post<any>(url, {}, { headers });
}


}
