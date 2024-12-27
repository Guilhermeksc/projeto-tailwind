import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss'],
})
export class LogoutButtonComponent {
  constructor(private loginService: LoginService) {}

  logout() {
    this.loginService.logout(); // O redirecionamento é gerenciado pelo serviço
  }
}