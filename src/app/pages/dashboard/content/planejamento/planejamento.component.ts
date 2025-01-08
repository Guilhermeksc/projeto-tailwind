import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../../core/auth/login/login.service';
import { MatDialog } from '@angular/material/dialog';
import { ControleProcessosService } from './controle-processos.service';
import { AddItemModalComponent } from './add-item-modal/add-item-modal.component';
import { ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-planejamento',
  templateUrl: './planejamento.component.html',
  styleUrls: ['./planejamento.component.scss'],
  imports: [MatTableModule, CommonModule]
})
export class PlanejamentoComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<any>; 

  private apiUrl = environment.apiUrl;
  unidade_compra: string | null = null;
  processos: any[] = [];
  displayedColumns: string[] = [
    'id_processo',
    'etapa',
    'situacao',
    'material_servico',
    'nup',
    'objeto',
    'unidade_compra',
    'valor_total'
  ];

  constructor(
    private loginService: LoginService,
    private controleProcessosService: ControleProcessosService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.unidade_compra = this.loginService.getunidade_compra(); // Obtém a unidade_compra do sessionStorage
    console.log('DEBUG: unidade_compra carregado no PlanejamentoComponent:', this.unidade_compra);
    this.loadProcessos();
  }

  loadProcessos(): void {
    this.controleProcessosService.getProcessos().subscribe((data) => {
      console.log('Dados carregados:', data);
      this.processos = data; // Atualiza os dados
      if (this.table) {
        this.table.renderRows(); // Força a re-renderização da tabela
      }
    });
  }
    
  openAddItemModal(): void {
    const dialogRef = this.dialog.open(AddItemModalComponent, {
      width: '600px',
      data: {},
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.controleProcessosService.addProcesso(result).subscribe(
          (response) => {
            console.log('Item adicionado com sucesso:', response);
            this.processos.push(response); // Adiciona o novo item localmente
            this.table.renderRows(); // Atualiza a tabela imediatamente
          },
          (error) => {
            console.error('Erro ao adicionar item:', error);
          }
        );
      }
    });
  }
}  