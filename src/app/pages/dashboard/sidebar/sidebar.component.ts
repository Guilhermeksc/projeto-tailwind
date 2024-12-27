import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { LogoutButtonComponent } from '../../../core/auth/logout-button/logout-button.component';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [CommonModule, LogoutButtonComponent],
})
export class SidebarComponent {
  collapsedSections: any = {
    dashboard: true,
    modulos: true,
    documentos: true,
    configuracoes: true,
  };

  activeSection: string = '';

  constructor(private router: Router) {}

  toggleSection(section: string) {
    this.collapsedSections[section] = !this.collapsedSections[section];
  }

  navigateTo(route: string) {
    this.router.navigate([route]); // Navega para a rota especificada
    this.activeSection = route.split('/').pop() || ''; // Atualiza a seção ativa
  }
}

