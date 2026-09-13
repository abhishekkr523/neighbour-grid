import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisputeCardComponent, Dispute } from './components/dispute-card.component';
import { PhotoComparisonComponent } from './components/photo-comparison.component';
import { ResolutionPanelComponent } from './components/resolution-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DisputeCardComponent, PhotoComparisonComponent, ResolutionPanelComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  disputes: Dispute[] = [
    {
      id: 'd1',
      toolName: 'Bosch Professional Hammer Drill',
      borrowerName: 'Rohan',
      ownerName: 'Rahul Sharma',
      status: 'OPEN',
      reason: 'Deep scratches on the motor casing not present during pickup.',
      date: 'Oct 26, 2026',
      escrowAmount: 1500
    },
    {
      id: 'd2',
      toolName: 'Kärcher High Pressure Washer',
      borrowerName: 'Amit',
      ownerName: 'Priya',
      status: 'RESOLVED_OWNER',
      reason: 'Missing pressure nozzle on return.',
      date: 'Oct 25, 2026',
      escrowAmount: 3000
    }
  ];

  selectedDispute: Dispute = this.disputes[0];

  selectDispute(dispute: Dispute) {
    this.selectedDispute = dispute;
  }
}
