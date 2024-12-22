import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, FormsModule],

})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  onRegister() {
    this.http.post('http://localhost:8000/api/register/', {
      username: this.username,
      email: this.email,
      password: this.password,
    }).subscribe(
      (response) => {
        console.log('Registro bem-sucedido:', response);
        // Redirecione para a página de login
      },
      (error) => {
        console.error('Erro no registro:', error);
      }
    );
  }
}
