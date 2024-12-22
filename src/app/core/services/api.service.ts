import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  consultarUASG(uasg: string): Observable<any> {
    return this.http.post(`${this.baseUrl}consulta_api/`, { uasg });
  }

  visualizarTabela(tabela: string): Observable<any> {
    return this.http.get(`${this.baseUrl}consulta_api/?tabela=${tabela}`);
  }

  limparTabelas(): Observable<any> {
    return this.http.post(`${this.baseUrl}limpar_tabelas/`, {});
  }

  getTables(): Observable<any> {
    return this.http.get(`${this.baseUrl}consulta_api/`);
  }
  adicionarItem(tabela: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}adicionar_item/`, { tabela, data });
  }
  
  excluirItem(tabela: string, id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}excluir_item/${tabela}/${id}/`);
  }
  
  gerarTabela(tabela: string): Observable<any> {
    return this.http.get(`${this.baseUrl}gerar_tabela/?tabela=${tabela}`);
  }
  
  controlarItens(tabela: string): Observable<any> {
    return this.http.get(`${this.baseUrl}controlar_itens/?tabela=${tabela}`);
  }
}