// name-input.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'name-input',
  templateUrl: './name-input.component.html',
  styleUrls: ['./name-input.component.scss'],
  imports: [FormsModule],
})
export class NameInputComponent {
  @Input() name: string = '';
  @Input() required: boolean = false; // Assegure-se de que é booleano
  @Output() nameChange: EventEmitter<string> = new EventEmitter<string>();

  // Método para emitir mudanças no nome
  onNameChange(value: string): void {
    this.name = value;
    this.nameChange.emit(this.name);
  }
}

