import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';
import { LoginService } from '../../../../../../core/auth/login/login.service';

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  private baseUrl = `${environment.apiUrl}comentarios/`;

  constructor(private http: HttpClient, private loginService: LoginService) {}

  private getHeaders(): HttpHeaders {
    const token = this.loginService.getAuthToken();
    if (!token) {
      console.error('Erro: Token de autenticação não encontrado.');
      throw new Error('Usuário não autenticado.');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getComentarios(numero: string, unidade_compra: string): Observable<any> {
    return this.http.get(`${this.baseUrl}?numero=${numero}&unidade_compra=${unidade_compra}`, {
      headers: this.getHeaders(),
    });
  }

  criarComentario(comentario: any): Observable<any> {
    return this.http.post(this.baseUrl, comentario, {
      headers: this.getHeaders(),
    });
  }

  atualizarComentario(id: number, comentario: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${id}/`, comentario, {
      headers: this.getHeaders(),
    });
  }

  excluirComentario(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}/`, {
      headers: this.getHeaders(),
    });
  }
}
