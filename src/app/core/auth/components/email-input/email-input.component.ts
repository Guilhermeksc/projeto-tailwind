// email-input.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.scss'],
  standalone: true,
  imports: [FormsModule]
})
export class EmailInputComponent {
  @Input() email: string = '';
  @Input() required: boolean = false; // Assegure-se de que é booleano
  @Output() emailChange: EventEmitter<string> = new EventEmitter<string>();

  onEmailChange(value: string): void {
    this.email = value;
    this.emailChange.emit(this.email);
  }
}
