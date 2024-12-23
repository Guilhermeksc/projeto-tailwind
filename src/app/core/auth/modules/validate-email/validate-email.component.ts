import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../../services/register.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.scss'],
  imports: [CommonModule],
})
export class ValidateEmailComponent {
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private registerService: RegisterService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const token = params['token'];
      if (token) {
        this.validateEmail(token);
      }
    });
  }

  validateEmail(token: string) {
    this.isLoading = true;

    this.registerService.validateEmail(token).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastr.success('E-mail validado com sucesso!', 'Sucesso');
        this.router.navigate(['/login']); // Redireciona para a página de login
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.error('Erro ao validar o e-mail. Tente novamente.', 'Erro');
      },
    });
  }
}
