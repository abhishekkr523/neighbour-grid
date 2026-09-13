import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolCardComponent } from './components/tool-card.component';
import { MapViewComponent } from './components/map-view.component';
import { ReservationModalComponent } from './components/reservation-modal.component';
import { MOCK_TOOLS, Tool } from './services/tools.mock';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ToolCardComponent, MapViewComponent, ReservationModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  tools: Tool[] = MOCK_TOOLS;
  selectedTool: Tool | null = null;
  isModalOpen = false;

  openReservationModal(tool: Tool) {
    this.selectedTool = tool;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    setTimeout(() => this.selectedTool = null, 300); // wait for animation
  }

  confirmReservation() {
    alert(`Reservation requested for ${this.selectedTool?.title}!`);
    this.closeModal();
  }
}
