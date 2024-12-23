import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AuthFormComponent } from '../auth-form/auth-form.component';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [AuthFormComponent, CommonModule],
})
export class LoginComponent {
  isLoading: boolean = false; // Estado de carregamento

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  handleLogin(event: { email: string; password?: string }) {
    if (!event.password) {
      this.toastr.error('A senha é obrigatória.', 'Erro');
      return;
    }

    this.isLoading = true; // Ativa o estado de carregamento

    this.loginService.login(event.email, event.password).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido:', response);
        this.isLoading = false; // Desativa o carregamento
        this.toastr.success('Login realizado com sucesso!', 'Sucesso');
        this.router.navigate(['/dashboard']); // Redireciona para o dashboard
      },
      error: (err) => {
        console.error('Erro no login:', err);
        this.isLoading = false; // Desativa o carregamento
        this.toastr.error('Erro ao fazer login. Verifique suas credenciais.', 'Erro');
      },
    });
  }
}
