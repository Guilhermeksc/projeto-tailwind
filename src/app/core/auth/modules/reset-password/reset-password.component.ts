import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordResetService } from '../../services/password-reset.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class ResetPasswordComponent {
  password: string = '';
  token: string = '';
  message: string | null = null;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private passwordResetService: PasswordResetService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtém o token da URL
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  onSubmit() {
    // Envia a nova senha para o backend
    this.passwordResetService.resetPassword(this.token, this.password).subscribe(
      (response) => {
        this.message = 'Senha redefinida com sucesso!';
        setTimeout(() => {
          this.router.navigate(['/login']); // Redireciona para a página de login
        }, 2000);
      },
      (error) => {
        if (error.status === 400) {
          this.error = 'Token inválido ou senha não fornecida.';
        } else {
          this.error = 'Erro ao redefinir a senha. Tente novamente mais tarde.';
        }
      }
    );
  }
}
