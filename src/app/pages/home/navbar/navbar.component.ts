import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule],
})
export class NavbarComponent {
  isMenuOpen: boolean = false;

  constructor(private router: Router) {}

  navigateToInicio() {
    this.router.navigate(['/inicio']);
  }

  navigateToSobreProjeto() {
    this.router.navigate(['/sobreProjeto']);
  }

  navigateToContatos() {
    this.router.navigate(['/contatos']);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
