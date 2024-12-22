import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhes-dialog',
  standalone: true,
  imports: [CommonModule], // Adicione CommonModule aqui
  template: `
    <h2>Detalhes da Linha</h2>
    <div *ngFor="let item of data | keyvalue">
      <strong>{{ item.key }}:</strong> {{ item.value }}
    </div>
    <button mat-button mat-dialog-close>Fechar</button>
  `,
  styles: [`
    div {
      margin: 5px 0;
    }
    button {
      margin-top: 20px;
    }
  `],
})
export class DetalhesDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
