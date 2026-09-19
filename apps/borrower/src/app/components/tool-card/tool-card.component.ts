import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tool } from '../../app';

@Component({
  selector: 'app-tool-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'tool-card.component.html',

})
export class ToolCardComponent {
  @Input() tool!: Tool;
  @Output() reserve = new EventEmitter<Tool>();
  @Output() chat = new EventEmitter<string>();
}
