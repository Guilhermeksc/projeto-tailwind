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
  newPassword: string = '';
  confirmPassword: string = '';
  isLoading: boolean = false;
  uid: string = ''; // Captura o UID da URL
  token: string = ''; // Captura o token da URL

  constructor(
    private route: ActivatedRoute,
    private resetPasswordService: ResetPasswordService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    
  }
  ngOnInit(): void {
    // Captura os parâmetros da URL
    this.route.params.subscribe(params => {
      this.uid = params['uid'];
      this.token = params['token'];
      console.log('UID:', this.uid, 'Token:', this.token); // Log para depuração
    });
  }

  handleSubmit(): void {
    if (!this.newPassword || !this.confirmPassword) {
      this.toastr.error('Por favor, preencha todos os campos.', 'Erro');
      return;
    }
  
    if (this.newPassword !== this.confirmPassword) {
      this.toastr.error('As senhas não coincidem.', 'Erro');
      return;
    }
  
    this.isLoading = true;
    this.resetPasswordService.resetPassword(this.uid, this.token, this.newPassword, this.confirmPassword).subscribe({
      next: () => {
        this.toastr.success('Senha redefinida com sucesso.', 'Sucesso');
        this.isLoading = false;
      },
      error: (err) => {
        // Extrai a mensagem de erro do backend
        const errorMessages = err.error?.error;
        if (typeof errorMessages === 'string') {
          this.toastr.error(errorMessages, 'Erro');
        } else if (typeof errorMessages === 'object') {
          const detailedErrors = Object.values(errorMessages).flat() as string[];
          detailedErrors.forEach((message: string) => {
            this.toastr.error(message, 'Erro');
          });
        } else {
          this.toastr.error('Erro ao redefinir a senha.', 'Erro');
        }
  
        this.isLoading = false;
      }
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
