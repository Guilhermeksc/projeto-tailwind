import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FlyingRobotComponent } from '../../shared/flying-robot/flying-robot.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterOutlet, FlyingRobotComponent],
})
export class HomeComponent {
  constructor(private router: Router) {}

  onInicioClick() {
    this.router.navigate(['/inicio']);
  }

  onSobreClick() {
    this.router.navigate(['/sobreProjeto']);
  }

  onContatosClick() {
    this.router.navigate(['/contatos']);
  }
}
