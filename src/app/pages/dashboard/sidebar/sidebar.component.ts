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
  unidade_compra: string | null = null; // Propriedade para armazenar o unidade_compra

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    this.unidade_compra = this.loginService.getunidade_compra();
    console.log('DEBUG: unidade_compra carregado no Sidebar:', this.unidade_compra);
  }

  toggleSection(section: string) {
    this.collapsedSections[section] = !this.collapsedSections[section];
  }

  navigateTo(route: string) {
    this.router.navigate([route]); // Navega para a rota especificada
    this.activeSection = route.split('/').pop() || ''; // Atualiza a seção ativa
  }

  navigateToAdmin(): void {
    const adminUrl = environment.production
      ? 'https://licitacao360.com/admin' // URL de produção
      : 'http://localhost:8000/admin'; // URL de desenvolvimento
    window.open(adminUrl, '_blank');
  }
  
}

