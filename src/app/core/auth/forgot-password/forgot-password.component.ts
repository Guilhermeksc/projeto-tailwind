// src/app/core/auth/forgot-password/forgot-password.component.ts

// import { Component } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
// import { Router } from '@angular/router';
// import { ForgotPasswordService } from './forgot-password.service';
// import { AuthFormComponent } from '../shared/auth-form/auth-form.component';
// import { EmailInputComponent } from '../shared/email-input/email-input.component';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { interval, Subscription } from 'rxjs';

// @Component({
//   standalone: true,
//   selector: 'app-forgot-password',
//   templateUrl: './forgot-password.component.html',
//   styleUrls: ['./forgot-password.component.scss'],
//   imports: [AuthFormComponent, EmailInputComponent, FormsModule, CommonModule],
// })

// export class ForgotPasswordComponent {
//   email: string = '';
//   isLoading: boolean = false;
//   isSuccess: boolean = false;
//   loadingMessage: string = 'Aguarde, estamos processando a redefinição da senha...';
//   private loadingSteps: string[] = [
//     'Aguarde, estamos processando a redefinição da senha...',
//     'Iniciando envio de e-mail para o endereço fornecido...',
//     'Aguarde enquanto enviamos o e-mail...',
//     'E-mail enviado com sucesso para o destinatário!',
//   ];
//   private stepIndex: number = 0;
//   private stepSubscription: Subscription | null = null;

//   constructor(
//     private toastr: ToastrService,
//     private router: Router,
//     private forgotPasswordService: ForgotPasswordService
//   ) {}

//   onEmailChange(value: string): void {
//     this.email = value;
//   }

//   handleSubmit(): void {
//     if (!this.email) {
//       this.toastr.error('Por favor, insira um e-mail válido.', 'Erro');
//       return;
//     }

//     this.isLoading = true;
//     this.stepIndex = 0;
//     this.updateLoadingMessage();

//     console.log('E-mail enviado:', this.email);

//     this.forgotPasswordService.requestPasswordReset(this.email).subscribe({
//       next: (response) => {
//         console.log('Resposta do backend:', response);
//         this.stopLoadingSteps();
//         this.isLoading = false;
//         this.isSuccess = true;
//         this.toastr.success(
//           'Solicitação de recuperação enviada com sucesso!',
//           'Sucesso'
//         );
//       },
//       error: (error) => {
//         console.error('Erro ao solicitar recuperação de senha:', error);
//         this.stopLoadingSteps();
//         this.isLoading = false;
//         this.toastr.error(
//           error.error?.error || 'Erro ao solicitar recuperação de senha.',
//           'Erro'
//         );
//       },
//     });
//   }

//   updateLoadingMessage(): void {
//     this.stepSubscription = interval(2000).subscribe(() => {
//       if (this.stepIndex < this.loadingSteps.length - 1) {
//         this.stepIndex++;
//         this.loadingMessage = this.loadingSteps[this.stepIndex];
//       } else {
//         this.stopLoadingSteps();
//       }
//     });
//   }

//   stopLoadingSteps(): void {
//     if (this.stepSubscription) {
//       this.stepSubscription.unsubscribe();
//       this.stepSubscription = null;
//     }
//   }

//   navigateToLogin(): void {
//     this.router.navigate(['/login']);
//   }
// }

import { Component } from '@angular/core';
import { ForgotPasswordService } from './forgot-password.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthFormComponent } from '../shared/auth-form/auth-form.component';
import { EmailInputComponent } from '../shared/email-input/email-input.component';
import { NameInputComponent } from '../shared/name-input/name-input.component';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  imports: [AuthFormComponent, NameInputComponent, EmailInputComponent, FormsModule, CommonModule],
})
export class ForgotPasswordComponent {
  username: string = ''; // Novo campo para o username
  email: string = '';
  isLoading: boolean = false;
  isSuccess: boolean = false;
  loadingMessage: string = 'Enviando solicitação...';

  constructor(
    private passwordRecoveryService: ForgotPasswordService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  // Manipula a submissão do formulário
  handleSubmit() {
    this.isLoading = true;

    this.passwordRecoveryService.sendRecoveryEmail(this.username, this.email).subscribe({
      next: () => {
        this.isLoading = false;
        this.isSuccess = true; // Exibe a mensagem de sucesso
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.error(err.error?.message || 'Erro ao enviar o e-mail.', 'Erro');
      }
    });
  }

  onNameChange(value: string): void {
    this.username = value;
  }
  // Atualiza o campo de e-mail
  onEmailChange(email: string) {
    this.email = email;
  }

  // Navega para a página de login
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
