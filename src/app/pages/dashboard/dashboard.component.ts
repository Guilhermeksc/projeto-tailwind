import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MinisidebarComponent } from './minisidebar/minisidebar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MinisidebarComponent,
    SidebarComponent,
  ],
})
export class DashboardComponent {
  activeSection: string = 'prazos';

  setSection(section: string) {
    this.activeSection = section;
  }
}
