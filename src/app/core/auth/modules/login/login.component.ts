import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, HttpClientModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private loginService: LoginService, 
    private toastr: ToastrService,
    private router: Router
  ) {}


  onSubmit() {
    if (!this.email || !this.password) {
      this.toastr.warning('Preencha todos os campos!', 'Atenção');
      return;
    }
  
    this.loginService.login(this.email, this.password).subscribe(
      (response) => {
        this.toastr.success('Login realizado com sucesso!', 'Sucesso');
        console.log('Token:', response.token);
        console.log('Nome:', response.name);
  
        // Salva o token (opcional: localStorage ou gerenciar em serviço)
        localStorage.setItem('authToken', response.token);
  
        // Redireciona para o dashboard
        this.router.navigate(['/dashboard']);
      },
      (error: HttpErrorResponse) => {
        let errorMsg = 'Ocorreu um erro ao tentar realizar o login.';
        console.error('Detalhes do erro:', error);
  
        if (error.status === 0) {
          errorMsg = 'Falha de conexão: verifique sua internet ou se o servidor está acessível.';
        } else if (error.status >= 400 && error.status < 500) {
          errorMsg = error.error?.detail || 'Credenciais inválidas. Verifique seu e-mail e senha.';
        } else if (error.status >= 500) {
          errorMsg = 'Erro no servidor. Tente novamente mais tarde.';
        } else if (error.message.includes('Http failure response')) {
          errorMsg = 'Erro de rede: não foi possível estabelecer uma conexão.';
        }
  
        this.toastr.error(errorMsg, 'Erro');
      }
    );
  }
  

  navigateToRegister(event: Event) {
    event.preventDefault(); // Previne o comportamento padrão do link
    this.router.navigate(['/register']); // Redireciona para a página de registro
  }

  navigateToPasswordReset(event: Event) {
    event.preventDefault(); // Previne o comportamento padrão do link
    this.router.navigate(['/password-reset']); // Redireciona para a página de registro
  }
  
}