import { Component } from '@angular/core';
import { PasswordResetService } from '../../services/password-reset.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { WelcomeComponent } from '../welcome/welcome.component';
@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  imports: [FormsModule, WelcomeComponent, CommonModule],
})
export class PasswordResetComponent {
  email: string = '';
  message: string | null = null;
  error: string | null = null;

  constructor(
    private passwordResetService: PasswordResetService,
    private router: Router
  ) {}

  onSubmit() {
    this.passwordResetService.sendResetLink(this.email).subscribe(
      (response) => {
        this.message = 'Um link de redefinição de senha foi enviado para o seu e-mail.';
      },
      (error) => {
        if (error.status === 404) {
          this.error = 'Usuário com este e-mail não encontrado.';
        } else if (error.status === 400) {
          this.error = 'E-mail é obrigatório.';
        } else {
          this.error = 'Erro ao processar sua solicitação. Tente novamente mais tarde.';
        }
      }
    );
  }
  navigateToLogin() {
    this.router.navigate(['/inicio']); // Redireciona para a página de registro
  }
}
