import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../../services/register.service';
import { AuthFormComponent } from '../auth-form/auth-form.component'; // Importe o AuthFormComponent
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [AuthFormComponent, CommonModule], // Adicione o AuthFormComponent aqui
})
export class RegisterComponent {
  isLoading: boolean = false;

  constructor(
    private registerService: RegisterService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onFormSubmit(event: { name?: string; email: string; password?: string; confirmPassword?: string }) {
    const { name, email, password, confirmPassword } = event;

    if (!name || !email || !password || !confirmPassword) {
      this.toastr.warning('Preencha todos os campos!', 'Atenção');
      return;
    }

    if (password !== confirmPassword) {
      this.toastr.warning('As senhas não coincidem!', 'Atenção');
      return;
    }

    this.isLoading = true;

    this.registerService.register(name, email, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastr.success(
          'Cadastro realizado com sucesso! Por favor, valide seu e-mail.',
          'Sucesso'
        );
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        const errorMsg = err.error?.message || 'Erro ao realizar cadastro.';
        this.toastr.error(errorMsg, 'Erro');
      },
    });
  }
}
