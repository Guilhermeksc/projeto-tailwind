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
  email: string = '';
  password: string = '';
  rememberMe: boolean = false; // Estado do checkbox lembrar

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  // Atualiza o e-mail ao modificar
  onEmailChange(value: string): void {
    this.email = value;
  }

  // Atualiza a senha ao modificar
  onPasswordChange(value: string): void {
    this.password = value;
  }

  // Submete o formulário de login
  handleSubmit(): void {
    if (!this.email || !this.password) {
      this.toastr.error('Todos os campos são obrigatórios.', 'Erro');
      return;
    }

    this.isLoading = true;

    this.loginService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido:', response);

        // Armazena informações localmente se lembrar estiver marcado
        if (this.rememberMe) {
          localStorage.setItem('user-email', this.email);
          localStorage.setItem('user-password', this.password);
        }

        this.isLoading = false;
        this.toastr.success('Login realizado com sucesso!', 'Sucesso');
        this.router.navigate(['/dashboard']); // Redireciona para o dashboard
      },
      error: (err) => {
        console.error('Erro no login:', err);
        this.isLoading = false;
        this.toastr.error(
          'Erro ao fazer login. Verifique suas credenciais.',
          'Erro'
        );
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
    this.router.navigate(['/password-change']);
  }
}