import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  private baseUrl = `${environment.apiUrl}comentarios/`; // Adicione a barra no final

  constructor(private http: HttpClient) {}

  getComentarios(numero: string, unidade_compra: string): Observable<any> {
    return this.http.get(`${this.baseUrl}?numero=${numero}&unidade_compra=${unidade_compra}`);
  }

  criarComentario(comentario: any): Observable<any> {
    return this.http.post(this.baseUrl, comentario); // Agora aponta para /api/comentarios/
  }

  atualizarComentario(id: number, comentario: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${id}/`, comentario);
  }

  excluirComentario(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}/`);
  }
}
