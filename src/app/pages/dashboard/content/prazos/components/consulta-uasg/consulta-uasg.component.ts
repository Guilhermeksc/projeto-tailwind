import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../../../../../core/services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consulta-uasg',
  templateUrl: './consulta-uasg.component.html',
  styleUrls: ['./consulta-uasg.component.scss'],
  imports: [FormsModule],
})
export class ConsultaUasgComponent {
  uasg: string = '';
  @Output() uasgConsultada = new EventEmitter<void>();

  constructor(private apiService: ApiService) {}

  consultarUASG() {
    if (this.uasg) {
      this.apiService.consultarUASG(this.uasg).subscribe({
        next: () => {
          alert('UASG consultada com sucesso.');
          this.uasgConsultada.emit();
        },
        error: () => alert('Erro ao consultar UASG.'),
      });
    }
  }
}
