import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para diretivas como *ngFor
import { FormsModule } from '@angular/forms';   // Necessário para [(ngModel)]

@Component({
  selector: 'app-tabela-contratos',
  standalone: true,
  imports: [CommonModule, FormsModule], // Inclua o CommonModule aqui
  templateUrl: './tabela-contrato.component.html',
  styleUrls: ['./tabela-contrato.component.scss'],
})
export class TabelaContratosComponent {
  @Input() tabelasDisponiveis: string[] = [];
  @Output() tabelaSelecionada = new EventEmitter<string>();

  tabelaSelecionadaAtual: string = '';

  confirmarSelecao() {
    console.log('Tabela selecionada:', this.tabelaSelecionadaAtual);
    if (this.tabelaSelecionadaAtual) {
      this.tabelaSelecionada.emit(this.tabelaSelecionadaAtual);
    } else {
      alert('Por favor, selecione uma tabela antes de confirmar.');
    }
  }
}
