import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fase-item',
  templateUrl: './fase-item.component.html',
  styleUrls: ['./fase-item.component.scss'],
})
export class FaseItemComponent {
  @Input() item!: string;
}
