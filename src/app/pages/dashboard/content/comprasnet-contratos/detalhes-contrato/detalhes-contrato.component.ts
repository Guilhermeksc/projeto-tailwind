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
import { DownloadButtonComponent } from './download-button/download-button.component';
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
    MatIconModule,
    DownloadButtonComponent],
})
export class DetalhesContratoComponent implements OnInit {
  comentarios: { id: number; comentario: string }[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DetalhesContratoComponent>,
    private comentariosService: ComentariosService, // Injeção do serviço de comentários
    private http: HttpClient
  ) {
    // Certifique-se de que `unidade_compra` está disponível no objeto `data`
    this.data = {
      ...this.data,
      unidade_compra: this.data.unidade_gestora_codigo || this.data.unidade_compra, // Ajuste para obter `unidade_compra` corretamente
    };
  }

  ngOnInit(): void {
    this.carregarComentarios();
  }

  carregarComentarios(): void {
    this.comentariosService.getComentarios(this.data.numero, this.data.unidade_compra).subscribe({
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