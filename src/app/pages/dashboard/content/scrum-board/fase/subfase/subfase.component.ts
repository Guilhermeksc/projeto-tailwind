import { Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';	

@Component({
  selector: 'app-subfase',
  templateUrl: './subfase.component.html',
  styleUrls: ['./subfase.component.scss'],
  imports: [CommonModule]
})
export class SubfaseComponent implements OnInit {
  ngOnInit(): void {
    // Initialization logic here
  }
  @Input() nome!: string;
  @Input() subfase: any;
  expanded = true;

  toggle(): void {
    this.expanded = !this.expanded;
  }
}
