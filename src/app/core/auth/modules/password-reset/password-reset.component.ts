import { Component } from '@angular/core';
import { AuthFormComponent } from '../auth-form/auth-form.component'; // Caminho correto para o AuthFormComponent
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
  
})
export class PasswordResetComponent {
  constructor(private router: Router) {}

  onFormSubmit(data: { email: string; password?: string; confirmPassword?: string }) {
    const password = data.password || ''; // Define um valor padrão
    const confirmPassword = data.confirmPassword || '';
  
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
  
    // Lógica de redefinição de senha
    console.log('Senha redefinida para:', data.email);
    this.router.navigate(['/login']);
  }
  
}
