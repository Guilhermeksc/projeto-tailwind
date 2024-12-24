// password-input.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class PasswordInputComponent {
  @Input() id: string = 'password';
  @Input() label: string = 'Senha';
  @Input() value: string = '';
  @Input() name: string = 'password';
  @Input() placeholder: string = 'Sua senha';
  @Input() required: boolean = false;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  show: boolean = false;

  // Método para alternar a visibilidade da senha
  toggle(): void {
    this.show = !this.show;
  }

  // Método para emitir mudanças no valor da senha
  onValueChange(value: string): void {
    this.value = value;
    this.valueChange.emit(this.value);
  }
}
