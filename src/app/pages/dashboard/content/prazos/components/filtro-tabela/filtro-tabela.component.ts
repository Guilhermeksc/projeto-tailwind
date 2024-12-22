import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtro-tabela',
  templateUrl: './filtro-tabela.component.html',
  styleUrls: ['./filtro-tabela.component.scss'],
})
export class FiltroTabelaComponent {
  @Input() dados: any[] = [];
  @Output() filtroAplicado = new EventEmitter<string>();

  aplicarFiltro(event: Event) {
    const target = event.target as HTMLInputElement;
    this.filtroAplicado.emit(target.value);
  }
}
