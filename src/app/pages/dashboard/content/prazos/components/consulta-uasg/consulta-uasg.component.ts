import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../../../../../core/services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consulta-unidade_compra',
  templateUrl: './consulta-uasg.component.html',
  styleUrls: ['./consulta-uasg.component.scss'],
  imports: [FormsModule],
})
export class Consultaunidade_compraComponent {
  unidade_compra: string = '';
  @Output() unidade_compraConsultada = new EventEmitter<void>();

  constructor(private apiService: ApiService) {}

  consultarunidade_compra() {
    if (this.unidade_compra) {
      this.apiService.consultarunidade_compra(this.unidade_compra).subscribe({
        next: () => {
          alert('unidade_compra consultada com sucesso.');
          this.unidade_compraConsultada.emit();
        },
        error: () => alert('Erro ao consultar unidade_compra.'),
      });
    }
  }
}
