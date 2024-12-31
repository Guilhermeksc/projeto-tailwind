import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InformacoesComplementaresComponent } from './informacoes-complementares/informacoes-complementares.component';
import { EmpenhosComponent } from './empenhos/empenhos.component';
import { DetalheComponent } from './detalhe/detalhe.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon'; // Importar o MatIconModule
import { ComentariosService } from './comentarios/comentarios.service'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detalhes-contrato',
  templateUrl: './detalhes-contrato.component.html',
  styleUrls: ['./detalhes-contrato.component.scss'],
  imports: [
    InformacoesComplementaresComponent, 
    EmpenhosComponent, 
    DetalheComponent, 
    ComentariosComponent, CommonModule, 
    FormsModule, 
    MatTabsModule,
    MatIconModule],
})
export class DetalhesContratoComponent implements OnInit {
  comentarios: { id: number; comentario: string }[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DetalhesContratoComponent>,
    private comentariosService: ComentariosService, // Injeção do serviço de comentários
    private http: HttpClient
  ) {
    // Certifique-se de que `uasg` está disponível no objeto `data`
    this.data = {
      ...this.data,
      uasg: this.data.unidade_gestora_codigo || this.data.uasg, // Ajuste para obter `uasg` corretamente
    };
  }

  ngOnInit(): void {
    this.carregarComentarios();
  }

  carregarComentarios(): void {
    this.comentariosService.getComentarios(this.data.numero, this.data.uasg).subscribe({
      next: (comentarios) => {
        this.comentarios = comentarios;
      },
      error: (err) => console.error('Erro ao carregar comentários:', err),
    });
  }

  atualizarComentarios(comentariosAtualizados: { id: number; comentario: string }[]): void {
    this.comentarios = comentariosAtualizados;
  }

  fechar(): void {
    this.dialogRef.close();
  }
  baixarArquivo(linkArquivos: string): void {
    if (!linkArquivos) {
      console.error('Link de arquivos não fornecido.');
      return;
    }
  
    // Substituir a URL para usar o proxy
    const proxyUrl = `http://localhost:8000/proxy/contrato/228363/arquivos`;

    // Faz a requisição ao link_arquivos através do proxy
    this.http.get<any[]>(proxyUrl).subscribe({
      next: (response) => {
        if (response && response.length > 0) {
          const arquivo = response[0].path_arquivo; // Obtém o primeiro path_arquivo
          if (arquivo) {
            this.downloadArquivo(arquivo);
          } else {
            console.error('Nenhum arquivo encontrado no path_arquivo.');
          }
        } else {
          console.error('Nenhum dado retornado pelo link_arquivos.');
        }
      },
      error: (err) => console.error('Erro ao obter link de arquivos:', err),
    });
  }
  
  private downloadArquivo(url: string): void {
    const link = document.createElement('a');
    link.href = url; // URL completa do arquivo
    link.target = '_blank';
    link.download = url.split('/').pop() || 'arquivo.pdf'; // Define o nome do arquivo
    document.body.appendChild(link); // Necessário para alguns navegadores
    link.click();
    document.body.removeChild(link); // Limpa o elemento criado
  }

  }