import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PasswordChangeService } from './password-change.service';
import { AuthFormComponent } from '../shared/auth-form/auth-form.component';
import { EmailInputComponent } from '../shared/email-input/email-input.component';
import { PasswordInputComponent } from '../shared/password-input/password-input.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';	

@Component({
  standalone: true,
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    AuthFormComponent,
    EmailInputComponent,
    PasswordInputComponent,
  ],
})

export class PasswordChangeComponent {
  isLoading: boolean = false;

  email: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private passwordChangeService: PasswordChangeService
  ) {}

  onEmailChange(value: string): void {
    this.email = value;
  }

  onCurrentPasswordChange(value: string): void {
    this.currentPassword = value;
  }

  onNewPasswordChange(value: string): void {
    this.newPassword = value;
  }

  onConfirmNewPasswordChange(value: string): void {
    this.confirmNewPassword = value;
  }

  handleSubmit(event?: Event): void {
    if (event) {
      event.preventDefault(); // Impede o comportamento padrão do formulário
    }
  
    console.log('handleSubmit chamado'); // Log para verificar a chamada do método
  
    if (this.newPassword !== this.confirmNewPassword) {
      this.toastr.error('As novas senhas não coincidem.', 'Erro');
      return;
    }
  
    if (this.newPassword === this.currentPassword) {
      this.toastr.error('A nova senha não pode ser igual à senha atual.', 'Erro');
      return;
    }
  
    const authToken = sessionStorage.getItem('auth-token');
    if (!authToken) {
      this.toastr.error('Você precisa estar autenticado para alterar a senha.', 'Erro');
      return;
    }
  
    console.log('Token de autenticação:', authToken);
    console.log('Enviando dados ao backend:', {
      email: this.email,
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
    });
  
    this.isLoading = true;
  
    this.passwordChangeService
      .changePassword(this.email, this.currentPassword, this.newPassword, authToken)
      .subscribe({
        next: (response) => {
          console.log('Resposta do backend:', response);
          this.isLoading = false;
          this.toastr.success('Senha alterada com sucesso!', 'Sucesso');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Erro ao alterar a senha:', error);
          this.isLoading = false;
          this.toastr.error(error.error?.error || 'Erro ao alterar a senha.', 'Erro');
        },
      });
  }
  
  navigateToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
