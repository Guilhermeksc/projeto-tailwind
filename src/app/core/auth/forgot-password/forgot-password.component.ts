import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from '../shared/auth-form/auth-form.component';
import { EmailInputComponent } from '../shared/email-input/email-input.component';

@Component({
  standalone: true,
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  imports: [CommonModule, AuthFormComponent, EmailInputComponent],
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private toastr: ToastrService, private router: Router) {}

  onEmailChange(value: string): void {
    this.email = value;
  }

  handleSubmit(): void {
    // Lógica de recuperação de senha
    this.toastr.success('Solicitação de recuperação enviada!', 'Sucesso');
    this.router.navigate(['/login']);
  }
}
