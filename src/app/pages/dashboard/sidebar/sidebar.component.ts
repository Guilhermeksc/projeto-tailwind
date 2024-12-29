import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { LogoutButtonComponent } from '../../../core/auth/logout-button/logout-button.component';
import { LoginService } from '../../../core/auth/login/login.service';

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
  uasg: string | null = null; // Propriedade para armazenar o UASG

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    this.uasg = this.loginService.getUasg();
    console.log('DEBUG: UASG carregado no Sidebar:', this.uasg);
  }

  toggleSection(section: string) {
    this.collapsedSections[section] = !this.collapsedSections[section];
  }

  navigateTo(route: string) {
    this.router.navigate([route]); // Navega para a rota especificada
    this.activeSection = route.split('/').pop() || ''; // Atualiza a seção ativa
  }

  navigateToAdmin(): void {
    window.open('http://localhost:8000/admin', '_blank'); // Substitua pelo endereço do admin do Django
  }
}

