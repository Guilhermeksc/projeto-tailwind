import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComentariosService } from './comentarios.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class ComentariosComponent implements OnInit {
  @Input() numero!: string;
  @Input() uasg!: string;
  @Input() comentarios: { id: number; comentario: string; data?: Date }[] = [];
  @Output() comentariosChange = new EventEmitter<{ id: number; comentario: string; data?: Date }[]>();

  novoComentario: string = '';

  constructor(private comentariosService: ComentariosService) {}

  ngOnInit(): void {
    this.carregarComentarios();
  }

  carregarComentarios(): void {
    if (this.numero && this.uasg) {
      this.comentariosService.getComentarios(this.numero, this.uasg).subscribe({
        next: (comentarios) => {
          this.comentarios = this.ordenarComentarios(comentarios);
          this.comentariosChange.emit(this.comentarios);
        },
        error: (err) => console.error('Erro ao carregar comentários:', err),
      });
    }
  }

  adicionarComentario(): void {
    if (this.novoComentario.trim()) {
      const novoComentarioObj = {
        numero: this.numero,
        uasg: this.uasg,
        comentario: this.novoComentario.trim(),
        data: new Date(), // Inclui a data atual para ordenação
      };
  
      this.comentariosService.criarComentario(novoComentarioObj).subscribe({
        next: (comentarioCriado) => {
          // Adiciona o comentário ao início da lista
          this.comentarios.unshift(comentarioCriado);
          this.comentariosChange.emit(this.comentarios);
          this.novoComentario = ''; // Limpa o campo de input
        },
        error: (err) => console.error('Erro ao adicionar comentário:', err),
      });
    }
  }
  

  editarComentario(id: number, index: number): void {
    const comentarioEditado = prompt('Edite o comentário:', this.comentarios[index]?.comentario);
    if (comentarioEditado !== null) {
      const comentarioAtualizado = { ...this.comentarios[index], comentario: comentarioEditado.trim() };

      this.comentariosService.atualizarComentario(id, comentarioAtualizado).subscribe({
        next: () => {
          this.comentarios[index].comentario = comentarioEditado.trim();
          this.comentariosChange.emit(this.comentarios);
        },
        error: (err) => console.error('Erro ao editar comentário:', err),
      });
    }
  }


  excluirComentario(id: number, index: number): void {
    if (confirm('Tem certeza que deseja excluir este comentário?')) {
      this.comentariosService.excluirComentario(id).subscribe({
        next: () => {
          this.comentarios.splice(index, 1);
          this.comentariosChange.emit(this.comentarios);
        },
        error: (err) => console.error('Erro ao excluir comentário:', err),
      });
    }
  }

  private ordenarComentarios(comentarios: { id: number; comentario: string; data?: Date }[]): { id: number; comentario: string; data?: Date }[] {
    return comentarios.sort((a, b) => (b.data ? new Date(b.data).getTime() : 0) - (a.data ? new Date(a.data).getTime() : 0));
  }
}