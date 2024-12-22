import { Component } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { ConsultaUasgComponent } from './components/consulta-uasg/consulta-uasg.component';
import { TabelaContratosComponent } from './components/tabela-contrato/tabela-contrato.component';
import { FiltroTabelaComponent } from './components/filtro-tabela/filtro-tabela.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prazos',
  standalone: true,
  imports: [CommonModule, ConsultaUasgComponent, TabelaContratosComponent, FiltroTabelaComponent],
  templateUrl: './prazos.component.html',
  styleUrls: ['./prazos.component.scss'],
})

export class PrazosComponent {
  uasg: string = '';
  tabelaSelecionada: string = '';
  tabelasDisponiveis: string[] = [];
  dadosFiltrados: any[] = [];
  colunas: string[] = []; // Defina a propriedade colunas
  filtro: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.atualizarTabelasDisponiveis();
  }

  atualizarTabelasDisponiveis() {
    this.apiService.getTables().subscribe({
      next: (response: any) => {
        console.log('Tabelas disponíveis atualizadas:', response.tables);
        if (response.success && response.tables) {
          this.tabelasDisponiveis = response.tables;
        }
      },
      error: (error: any) => console.error('Erro ao atualizar tabelas:', error),
    });
  }

  onTabelaConfirmada(tabela: string) {
    console.log('Tabela confirmada:', tabela);
    this.apiService.visualizarTabela(tabela).subscribe({
      next: (response: any) => {
        console.log('Dados recebidos:', response);
        if (response.success && response.data) {
          this.dadosFiltrados = response.data;
          this.colunas = Object.keys(response.data[0] || {}); // Define as colunas dinamicamente
        } else {
          this.dadosFiltrados = [];
          this.colunas = [];
        }
      },
      error: (error: any) => console.error('Erro ao carregar dados da tabela:', error),
    });
  }

  onUasgConsultada() {
    this.atualizarTabelasDisponiveis();
  }

  onTabelaSelecionada(tabela: string) {
    this.tabelaSelecionada = tabela;
    this.apiService.visualizarTabela(tabela).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.dadosFiltrados = response.data;
        }
      },
      error: (error: any) => console.error('Erro ao visualizar tabela:', error),
    });
  }

  onFiltrarDados(filtro: string) {
    this.filtro = filtro;
    // Aplicar o filtro na tabela.
    this.dadosFiltrados = this.dadosFiltrados.filter((dado: any) => 
      Object.values(dado).some((valor) => valor?.toString().toLowerCase().includes(filtro.toLowerCase()))
    );
  }
  onRowClick(event: Event) {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => row.classList.remove('selected')); // Remove a classe de todas as linhas
  
    const clickedRow = event.target as HTMLElement;
    if (clickedRow) {
      let row = clickedRow.closest('tr');
      if (row) {
        row.classList.add('selected'); // Adiciona a classe na linha clicada
      }
    }
  }
}
