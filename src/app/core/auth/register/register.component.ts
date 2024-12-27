// src/app/core/auth/register/register.component.ts

import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from '../shared/auth-form/auth-form.component';
import { NameInputComponent } from '../shared/name-input/name-input.component';
import { EmailInputComponent } from '../shared/email-input/email-input.component';
import { PasswordInputComponent } from '../shared/password-input/password-input.component';
import { RegisterService } from './register.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    CommonModule,
    AuthFormComponent,
    NameInputComponent,
    EmailInputComponent,
    PasswordInputComponent,
    FormsModule,
  ],
})
export class RegisterComponent {
  isLoading: boolean = false; 
  isSuccess: boolean = false;
  loadingMessage: string = 'Processando cadastro...';

  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private toastr: ToastrService, private router: Router, private registerService: RegisterService) {}

  onNameChange(value: string): void {
    this.name = value;
  }

  onEmailChange(value: string): void {
    this.email = value;
  }

  onPasswordChange(value: string): void {
    this.password = value;
  }

  onConfirmPasswordChange(value: string): void {
    this.confirmPassword = value;
  }

  handleSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.toastr.error('As senhas não coincidem.', 'Erro');
      return;
    }

    this.isLoading = true;

    this.registerService.register(this.name, this.email, this.password).subscribe({
      next: (response) => {
        console.log('Resposta do backend:', response);
        this.isLoading = false;
        this.isSuccess = true; // Exibe a mensagem de sucesso
        this.toastr.success(
          'Registro realizado com sucesso! Verifique seu e-mail para ativar sua conta.',
          'Sucesso'
        );
      },
      error: (error) => {
        console.error('Erro no registro:', error);
        this.isLoading = false;
        this.toastr.error(error.error?.error || 'Erro ao registrar.', 'Erro');
      },
    });
  }

  navigateToLogin(): void {
    sessionStorage.clear(); // Limpa qualquer sessão existente
    console.log('Sessão limpa. Redirecionando para /login...');
    this.router.navigate(['/login']);
  }
  

  navigateToInicio(): void {
    this.router.navigate(['/inicio']);
  }
}
