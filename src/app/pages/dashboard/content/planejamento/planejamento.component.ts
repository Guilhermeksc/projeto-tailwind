import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-planejamento',
  templateUrl: './planejamento.component.html',
  styleUrls: ['./planejamento.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class PlanejamentoComponent implements OnInit {
  // Propriedades mantidas
  selectedYear: number = new Date().getFullYear();
  availableYears: number[] = [];
  searchQuery: string = '';
  tableData: any[] = [];
  filteredTableData: any[] = [];
  tableColumns: string[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.initializeYears();
    this.loadTableData();
  }

  initializeYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 10; year <= currentYear + 10; year++) {
      this.availableYears.push(year);
    }
  }

  loadTableData(): void {
    this.apiService.visualizarTabela('planejamento').subscribe(
      (response) => {
        this.tableData = response.data; // Ajuste conforme o formato retornado
        this.filteredTableData = [...this.tableData];
        this.tableColumns = Object.keys(this.tableData[0] || {});
      },
      (error) => {
        console.error('Erro ao carregar dados:', error);
      }
    );
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredTableData = this.tableData.filter(row =>
      Object.values(row).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(query)
      )
    );
  }

  addItem(): void {
    const newItem = { coluna1: 'Novo Valor', coluna2: 'Outro Valor' }; // Substitua pelos dados apropriados
    this.apiService.adicionarItem('planejamento', newItem).subscribe(
      (response) => {
        this.loadTableData(); // Recarrega a tabela após adicionar
      },
      (error) => {
        console.error('Erro ao adicionar item:', error);
      }
    );
  }

  deleteItem(): void {
    const itemId = 1; // Substitua pelo ID do item a ser excluído
    this.apiService.excluirItem('planejamento', itemId).subscribe(
      (response) => {
        this.loadTableData(); // Recarrega a tabela após excluir
      },
      (error) => {
        console.error('Erro ao excluir item:', error);
      }
    );
  }

  generateTable(): void {
    this.apiService.gerarTabela('planejamento').subscribe(
      (response) => {
        console.log('Tabela gerada:', response);
      },
      (error) => {
        console.error('Erro ao gerar tabela:', error);
      }
    );
  }

  controlItems(): void {
    this.apiService.controlarItens('planejamento').subscribe(
      (response) => {
        console.log('Controle de itens:', response);
      },
      (error) => {
        console.error('Erro ao controlar itens:', error);
      }
    );
  }
}
