// src/app/core/auth/validate-email/validate-email.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../register/register.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.scss'],
  imports: [CommonModule],
})
export class ValidateEmailComponent implements OnInit {
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private registerService: RegisterService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');
    console.log('Token capturado:', token); // Log para verificar o token
  
    if (token) {
      this.registerService.validateEmail(token).subscribe({
        next: () => {
          console.log('Validação bem-sucedida'); // Log para sucesso
          this.toastr.success('E-mail validado com sucesso!', 'Sucesso');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Erro na validação:', err); // Log para erro
          this.toastr.error('Token inválido ou expirado.', 'Erro');
          this.router.navigate(['/register']);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    } else {
      console.error('Token não fornecido'); // Log para token ausente
      this.toastr.error('Token não fornecido.', 'Erro');
      this.router.navigate(['/register']);
    }
  }
}