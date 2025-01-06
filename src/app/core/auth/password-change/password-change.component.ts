// import { Component } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
// import { Router } from '@angular/router';
// import { PasswordChangeService } from './password-change.service';
// import { AuthFormComponent } from '../shared/auth-form/auth-form.component';
// import { EmailInputComponent } from '../shared/email-input/email-input.component';
// import { PasswordInputComponent } from '../shared/password-input/password-input.component';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';	

// @Component({
//   standalone: true,
//   selector: 'app-password-change',
//   templateUrl: './password-change.component.html',
//   styleUrls: ['./password-change.component.scss'],
//   imports: [
//     CommonModule,
//     FormsModule,
//     AuthFormComponent,
//     EmailInputComponent,
//     PasswordInputComponent,
//   ],
// })

import { Component } from '@angular/core';
import { PasswordChangeService } from './password-change.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthFormComponent } from '../shared/auth-form/auth-form.component';
import { PasswordInputComponent } from '../shared/password-input/password-input.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';	

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
    imports: [
    CommonModule,
    FormsModule,
    AuthFormComponent,
    PasswordInputComponent,
  ],
})
export class PasswordChangeComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  isLoading: boolean = false;

  constructor(
    private passwordChangeService: PasswordChangeService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  handleSubmit() {
    if (this.newPassword !== this.confirmNewPassword) {
      this.toastr.error('As senhas não coincidem.', 'Erro');
      return;
    }

    this.isLoading = true;
    this.passwordChangeService
      .changePassword(this.currentPassword, this.newPassword, this.confirmNewPassword)
      .subscribe({
        next: () => {
          this.toastr.success('Senha alterada com sucesso.', 'Sucesso');
          this.isLoading = false;
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.toastr.error(err.error?.message || 'Erro ao alterar a senha.', 'Erro');
          this.isLoading = false;
        },
      });
  }

  onCurrentPasswordChange(password: string) {
    this.currentPassword = password;
  }

  onNewPasswordChange(password: string) {
    this.newPassword = password;
  }

  onConfirmNewPasswordChange(password: string) {
    this.confirmNewPassword = password;
  }

  // Navegação para outras telas
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
