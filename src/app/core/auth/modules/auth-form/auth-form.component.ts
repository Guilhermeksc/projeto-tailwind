import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { WelcomeComponent } from '../welcome/welcome.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  imports: [FormsModule, WelcomeComponent, CommonModule, HttpClientModule],
})

export class AuthFormComponent {
  @Input() type: 'login' | 'register' | 'reset-password' | 'recover-password' | 'validate-email' = 'login';
  @Output() formSubmit = new EventEmitter<{
    email: string;
    name?: string;
    password?: string;
    confirmPassword?: string;
    currentPassword?: string;
    newPassword?: string;
  }>();

  email: string = '';
  name: string = ''; // Nome para registro
  password: string = '';
  confirmPassword: string = ''; // Confirmação de senha
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.type === 'reset-password') {
      if (this.newPassword !== this.confirmNewPassword) {
        alert('As novas senhas não correspondem.');
        return;
      }
      this.formSubmit.emit({
        email: this.email,
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
        confirmPassword: this.confirmNewPassword,
      });
    } else if (this.type === 'register') {
      if (this.password !== this.confirmPassword) {
        alert('As senhas não coincidem.');
        return;
      }
      this.formSubmit.emit({
        email: this.email,
        name: this.name,
        password: this.password,
        confirmPassword: this.confirmPassword,
      });
    } else if (this.type === 'login') {
      this.formSubmit.emit({ email: this.email, password: this.password });
    } else {
      this.formSubmit.emit({ email: this.email });
    }
  }

  navigateToRegister(event: Event) {
    event.preventDefault();
    this.router.navigate(['/register']);
  }

  navigateToPasswordReset(event: Event) {
    event.preventDefault();
    this.router.navigate(['/password-reset']);
  }

  navigateToLogin(event: Event) {
    event.preventDefault();
    this.router.navigate(['/login']);
  }
}