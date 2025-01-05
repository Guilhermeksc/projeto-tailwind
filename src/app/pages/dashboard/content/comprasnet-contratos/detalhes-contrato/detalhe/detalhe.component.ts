import { Component, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrl: './detalhe.component.scss',
  imports: [CommonModule, FormsModule, MatTabsModule],
})
export class DetalheComponent {

  @Input() data: any;
  @Input() comentarios: string[] = [];
  novoComentario: string = '';

  adicionarComentario(): void {
    if (this.novoComentario.trim()) {
      this.comentarios.push(this.novoComentario.trim());
      this.novoComentario = '';
    }
  }

  editarComentario(index: number): void {
    const comentarioEditado = prompt('Edite o comentário:', this.comentarios[index]);
    if (comentarioEditado !== null) {
      this.comentarios[index] = comentarioEditado.trim();
    }
  }

  excluirComentario(index: number): void {
    if (confirm('Tem certeza que deseja excluir este comentário?')) {
      this.comentarios.splice(index, 1);
    }
  }
}