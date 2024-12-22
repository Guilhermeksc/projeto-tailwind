import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { MastheadComponent } from './masthead/masthead.component';
import { Licitacao360Component } from './licitacao360/licitacao360.component';
import { ContatosComponent } from './contatos/contatos.component';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, MastheadComponent, NavbarComponent,],
})

export class HomeComponent {
  @ViewChild(MastheadComponent) masthead!: MastheadComponent;

  navigateToInicio() {
    if (this.masthead) {
      this.masthead.showInicio();
    }
  }

  navigateToSobreProjeto() {
    if (this.masthead) {
      this.masthead.showSobreProjeto();
    }
  }

  navigateToContatos() {
    if (this.masthead) {
      this.masthead.showContatos();
    }
  }
}
