import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { Licitacao360Component } from '../licitacao360/licitacao360.component';

@Component({
  selector: 'app-masthead',
  templateUrl: './masthead.component.html',
  styleUrls: ['./masthead.component.scss'],
  imports: [CommonModule, LoginComponent, Licitacao360Component],
})
export class MastheadComponent {
  currentView: 'inicio' | 'sobreProjeto' | 'contatos' = 'inicio';

  showInicio() {
    this.currentView = 'inicio';
  }

  showSobreProjeto() {
    this.currentView = 'sobreProjeto';
  }

  showContatos() {
    this.currentView = 'contatos';
  }
}