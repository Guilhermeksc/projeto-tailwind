import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-fase',
  templateUrl: './fase.component.html',
  styleUrls: ['./fase.component.scss'],
  imports: [CommonModule]
})
export class FaseComponent {
  @Input() subfases!: string[];
}
