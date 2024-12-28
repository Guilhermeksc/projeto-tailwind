import { Component } from '@angular/core';
import { AuthFormComponent } from '../../shared/auth-form/auth-form.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';	

@Component({
  selector: 'app-invalid-reset',
  templateUrl: './invalid-reset.component.html',
  styleUrl: './invalid-reset.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    AuthFormComponent,
  ],
})
export class InvalidResetComponent {

    constructor(
      private router: Router,
    ) {}
  navigateToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
