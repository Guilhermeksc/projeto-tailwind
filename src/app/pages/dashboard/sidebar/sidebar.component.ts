import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [ CommonModule],
})
export class SidebarComponent {
  uasg: string = environment.uasg;

  @Output() sectionChange = new EventEmitter<string>();

  collapsedSections = {
    dashboard: true,
    modulos: true,
    documentos: true,
    configuracoes: false,
  };

  activeSection: string = '';

  constructor(private router: Router) {}

  toggleSection(section: keyof typeof this.collapsedSections) {
    this.collapsedSections[section] = !this.collapsedSections[section];
  }

  navigateTo(section: string): void {
    this.activeSection = section; // Atualizar a seção ativa visualmente
    this.sectionChange.emit(section); // Emitir evento para comunicação externa
    this.router.navigate([`/360/${section}`]); // Navegar para a rota
  }
}
