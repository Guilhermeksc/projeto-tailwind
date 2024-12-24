import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PasswordChangeService } from './password-change.service';
import { AuthFormComponent } from '../shared/auth-form/auth-form.component';
import { EmailInputComponent } from '../shared/email-input/email-input.component';
import { PasswordInputComponent } from '../shared/password-input/password-input.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
  imports: [
    CommonModule,
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

  handleSubmit(): void {
    if (this.newPassword !== this.confirmNewPassword) {
      this.toastr.error('As novas senhas não coincidem.', 'Erro');
      return;
    }

    this.isLoading = true;
    const authToken = 'your-auth-token'; // Replace with actual token retrieval logic
    this.passwordChangeService.changePassword(this.email, this.currentPassword, this.newPassword, authToken)
      .subscribe({
        next: () => {
          this.toastr.success('Senha alterada com sucesso!', 'Sucesso');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.toastr.error(error.error?.error || 'Erro ao alterar a senha.', 'Erro');
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
