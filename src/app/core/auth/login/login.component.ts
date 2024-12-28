// login.component.ts

import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from '../shared/auth-form/auth-form.component';
import { EmailInputComponent } from '../shared/email-input/email-input.component';
import { PasswordInputComponent } from '../shared/password-input/password-input.component';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    AuthFormComponent,
    EmailInputComponent,
    PasswordInputComponent,
    CommonModule,
    FormsModule,
  ],
})
export class LoginComponent {
  isLoading: boolean = false; // Estado de carregamento
  username: string = '';
  password: string = '';
  rememberMe: boolean = false; // Estado do checkbox lembrar

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  // Atualiza o e-mail ao modificar
  onUserChange(value: string): void {
    this.username = value;
  }

  // Atualiza a senha ao modificar
  onPasswordChange(value: string): void {
    this.password = value;
  }

  // Submete o formulário de login
  handleSubmit(): void {
    if (!this.username || !this.password) {
      this.toastr.error('Todos os campos são obrigatórios.', 'Erro');
      return;
    }
  
    this.isLoading = true;
  
    this.loginService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.isLoading = false;
  
        if (response.is_active) {
          this.toastr.success('Login realizado com sucesso!', 'Sucesso');
          this.router.navigate(['/dashboard']); // Redireciona para o dashboard
        } else {
          this.toastr.error('Sua conta ainda não foi ativada. Verifique seu e-mail.', 'Erro');
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.toastr.error(error.message || 'Erro ao fazer login. Verifique suas credenciais.', 'Erro');
      },
    });
  }
  
  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  navigateToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  navigateToChangePassword(): void {
    this.router.navigate(['/change-password']);
  }
}