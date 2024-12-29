import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaseComponent } from './fase/fase.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-scrum-board',
  templateUrl: './scrum-board.component.html',
  styleUrls: ['./scrum-board.component.scss'],
  imports: [CommonModule, FaseComponent, FormsModule]
})
export class ScrumBoardComponent {
  fases = [
    {
      nome: 'Fase Preparatória (Fase Interna)',
      subfases: [
        'Planejamento',
        'Pesquisa de Preços',
        'IRP',
        'Consolidação de Demandas',
        'Nota Técnica'
      ]
    },
    {
      nome: 'Seleção do Fornecedor (Fase Externa)',
      subfases: [
        'AGU',
        'Recomendações AGU',
        'Pré-Publicação',
        'Impugnado',
        'Sessão Pública',
        'Fase Recursal'
      ]
    },
    {
      nome: 'Gestão Contratual',
      subfases: ['Assinatura do Contrato', 'Renovação', 'Aditivo']
    }
  ];

}
