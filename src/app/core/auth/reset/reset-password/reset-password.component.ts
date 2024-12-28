// src/app/core/auth/reset-password/reset-password.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordService } from './reset-password.service';
import { AuthFormComponent } from '../../shared/auth-form/auth-form.component';
import { EmailInputComponent } from '../../shared/email-input/email-input.component';
import { PasswordInputComponent } from '../../shared/password-input/password-input.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';	

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    AuthFormComponent,
    PasswordInputComponent,
  ],  
})
export class ResetPasswordComponent {
  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private resetPasswordService: ResetPasswordService
  ) {
    this.route.params.subscribe((params) => {
      this.token = params['token']; // Certifica-se de que o token seja obtido da rota
    });
  }

  handleSubmit(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.toastr.error('As senhas não coincidem.', 'Erro');
      return;
    }

    this.isLoading = true;
    this.resetPasswordService
      .resetPassword(this.token, this.newPassword)
      .subscribe({
        next: () => {
          this.toastr.success('Senha redefinida com sucesso!', 'Sucesso');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.toastr.error(
            error.error?.message || 'Erro ao redefinir a senha.',
            'Erro'
          );
          this.isLoading = false;
        },
      });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
