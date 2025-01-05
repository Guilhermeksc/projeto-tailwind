import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-button',
  standalone: true,
  templateUrl: './update-button.component.html',
  styleUrls: ['./update-button.component.scss'],
  imports: [CommonModule],
})
export class UpdateButtonComponent {
  @Input() isLoading: boolean = false; // Define se o botão está em estado de carregamento
  @Input() label: string = 'Atualizar'; // Texto padrão do botão
  @Input() loadingLabel: string = 'Atualizando...'; // Texto enquanto carrega
  @Output() clickEvent = new EventEmitter<void>(); // Emite evento de clique

  handleClick(): void {
    this.clickEvent.emit(); // Emite o evento ao clicar
  }
}