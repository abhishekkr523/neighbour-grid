import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Tool } from "../../app";

@Component({
  selector: "app-reservation-modal",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "reservation-modal.component.html",
})
export class ReservationModalComponent {
  @Input() isOpen = false;
  @Input() tool: Tool | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<Tool>();

  confirmReservation(): void {
    if (!this.tool) {
      return;
    }

    this.confirm.emit(this.tool);
  }
}
