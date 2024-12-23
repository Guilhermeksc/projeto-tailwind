import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-masthead',
  templateUrl: './masthead.component.html',
  styleUrls: ['./masthead.component.scss'],
  imports: [CommonModule],
})
export class MastheadComponent {

    currentView: string = 'inicio'; // Define a visão inicial como 'inicio'
  
    navigateToInicio() {
      this.currentView = 'inicio';
    }
  
    navigateToSobreProjeto() {
      this.currentView = 'sobreProjeto';
    }
  
    navigateToContatos() {
      this.currentView = 'contatos';
    }
  }