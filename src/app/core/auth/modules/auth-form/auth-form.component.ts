// auth-form.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailInputComponent } from '../../components/email-input/email-input.component';
import { NameInputComponent } from '../../components/name-input/name-input.component';
import { PasswordInputComponent } from '../../components/password-input/password-input.component';
import { WelcomeComponent } from '../welcome/welcome.component';

@Component({
  selector: 'auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  standalone: true,
  imports: [
    WelcomeComponent,
    FormsModule,
    CommonModule,
    EmailInputComponent,
    NameInputComponent,
    PasswordInputComponent
  ]
})
export class AuthFormComponent {
  email: string = '';
  name: string = '';
  password: string = '';
  confirmPassword: string = '';

  type: 'login' | 'register' = 'login'; // Tipo atual do formulário

  @Output() submitLogin: EventEmitter<{ email: string; password: string }> = new EventEmitter();
  @Output() submitRegister: EventEmitter<{ name: string; email: string; password: string; confirmPassword: string }> = new EventEmitter();

  getTitle(): string {
    return this.type === 'login' ? 'Login' : 'Registro';
  }

  onSubmit(): void {
    if (this.type === 'login') {
      if (this.email && this.password) {
        this.submitLogin.emit({ email: this.email, password: this.password });
      }
    } else if (this.type === 'register') {
      if (this.name && this.email && this.password && this.confirmPassword) {
        this.submitRegister.emit({ name: this.name, email: this.email, password: this.password, confirmPassword: this.confirmPassword });
      }
    }
  }

  toggleFormType(): void {
    this.type = this.type === 'login' ? 'register' : 'login';
  }
}
