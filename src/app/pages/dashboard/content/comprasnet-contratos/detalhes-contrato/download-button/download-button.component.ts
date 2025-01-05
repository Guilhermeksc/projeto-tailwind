import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../../../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-download-button',
  templateUrl: './download-button.component.html',
  styleUrls: ['./download-button.component.scss'],
  imports: [MatIconModule],
})
export class DownloadButtonComponent {
  @Input() idContrato!: string;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  baixarArquivo(): void {
    if (!this.idContrato) {
      console.error('ID do contrato não fornecido.');
      return;
    }

    // Construa a URL do proxy usando o ID do contrato
    const proxyUrl = `${environment.apiUrl}proxy/contrato/${this.idContrato}/arquivos/`;

    // Faça a requisição HTTP para obter os arquivos
    this.http.get<any[]>(proxyUrl).subscribe({
      next: (response) => {
        if (response && response.length > 0) {
          const arquivo = response[0].path_arquivo;
          if (arquivo) {
            this.iniciarDownload(arquivo);
          } else {
            this.exibirToast('Nenhum arquivo disponível para download.', 'error');
          }
        } else {
          this.exibirToast('Nenhum dado retornado pelo servidor.', 'error');
        }
      },
      error: (err) => {
        console.error('Erro ao obter link de arquivos:', err);
        this.exibirToast('Erro ao buscar o arquivo. Tente novamente.', 'error');
      },
    });
  }

  private iniciarDownload(url: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = url.split('/').pop() || 'arquivo.pdf';
    link.click();
  }

  private exibirToast(mensagem: string, tipo: 'success' | 'error'): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 3000,
      panelClass: tipo === 'success' ? 'toast-success' : 'toast-error',
    });
  }
}