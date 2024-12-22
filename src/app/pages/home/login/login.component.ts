import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Para o uso de [(ngModel)]
@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule], // Registre aqui o AuthLayoutComponent
})
export class LoginComponent {}