import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empenhos',
  templateUrl: './empenhos.component.html',
  styleUrls: ['./empenhos.component.scss'],
})
export class EmpenhosComponent {
  @Input() data: any;
}
