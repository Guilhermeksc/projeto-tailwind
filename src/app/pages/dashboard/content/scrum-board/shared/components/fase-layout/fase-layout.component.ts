import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-fase-layout',
  template: `
    <div class="fase-layout">
      <h2 class="fase-title">{{ title }}</h2>
      <div class="fase-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./fase-layout.component.scss'],
  standalone: true,
})
export class FaseLayoutComponent {
  @Input() title!: string;
  @Input() processSteps: string[] = [];

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}