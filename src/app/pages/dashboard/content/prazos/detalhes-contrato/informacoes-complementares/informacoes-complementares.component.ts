import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-informacoes-complementares',
  templateUrl: './informacoes-complementares.component.html',
  styleUrls: ['./informacoes-complementares.component.scss'],
  imports: [CommonModule],
})
export class InformacoesComplementaresComponent {
  @Input() data: any;
}
