import { Component, Input } from '@angular/core';
import { WelcomeComponent } from '../../welcome/welcome.component';
@Component({
  standalone: true,
  selector: 'auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  imports: [WelcomeComponent],
})
export class AuthFormComponent {
  @Input() title: string = ''; // Título dinâmico
}
