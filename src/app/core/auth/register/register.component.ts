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
        this.toastr.success(
          'Registro realizado com sucesso! Verifique seu e-mail para ativar sua conta.',
          'Sucesso'
        );
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.toastr.error(error.error?.error || 'Erro ao registrar.', 'Erro');
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
  
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
