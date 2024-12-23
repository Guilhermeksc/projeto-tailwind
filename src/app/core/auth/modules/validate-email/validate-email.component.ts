import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-validate-email',
  imports: [ CommonModule ],
  templateUrl: './validate-email.component.html',
  styleUrl: './validate-email.component.scss'
})
export class ValidateEmailComponent implements OnInit {
  message: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');
    if (token) {
      this.registerService.validateEmail(token).subscribe(
        (response) => {
          this.message = response.message;
        },
        (error) => {
          this.message = error.error;
        }
      );
    }
  }
}