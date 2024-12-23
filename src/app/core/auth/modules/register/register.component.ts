import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { WelcomeComponent } from '../welcome/welcome.component';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [FormsModule, WelcomeComponent, HttpClientModule],
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(@Inject(RegisterService) 
  private registerService: RegisterService, 
  private toastr: ToastrService, 
  private router: Router
) {}

  onSubmit() {
    if (!this.name || !this.email || !this.password) {
      this.toastr.warning('Preencha todos os campos!', 'Atenção');
      return;
    }

    this.registerService.register(this.name, this.email, this.password).subscribe(
      (response) => {
        this.toastr.success('Registro realizado com sucesso!', 'Sucesso');
        console.log('Resposta do servidor:', response);
      },
      (error: HttpErrorResponse) => {
        let errorMsg = 'Ocorreu um erro ao tentar registrar o usuário.';
        if (error.status === 400) {
          errorMsg = error.error?.detail || 'Já existe um usuário com essas credenciais.';
        } else if (error.status >= 500) {
          errorMsg = 'Erro no servidor. Tente novamente mais tarde.';
        }
        console.error('Erro no registro:', error);
        this.toastr.error(errorMsg, 'Erro');
      }
    );
  }

  navigateToLogin() {
    this.router.navigate(['/inicio']); // Redireciona para a página de registro
  }
}