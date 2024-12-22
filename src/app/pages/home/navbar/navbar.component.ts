import { Component, HostListener, EventEmitter, Output } from '@angular/core';
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
  isHidden: boolean = false;
  isScrollingUp: boolean = false;

  private lastScrollTop: number = 0;

  @Output() inicioClick = new EventEmitter<void>();
  @Output() sobreClick = new EventEmitter<void>();
  @Output() contatosClick = new EventEmitter<void>();

  navigateToInicio() {
    this.inicioClick.emit();
  }

  navigateToSobreProjeto() {
    this.sobreClick.emit();
  }

  navigateToContatos() {
    this.contatosClick.emit();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > this.lastScrollTop) {
      this.isHidden = true;
      this.isScrollingUp = false;
    } else {
      this.isHidden = false;
      this.isScrollingUp = true;
    }

    this.lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  }
}
