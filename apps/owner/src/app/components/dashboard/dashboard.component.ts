import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InventoryListComponent } from '../inventory-list/inventory-list.component';
import { AuditUploadComponent } from '../../components/audit-upload.component';
import { EscrowTimelineComponent } from '../../components/escrow-timeline.component';
import { BookingRequestsComponent } from '../../components/booking-requests.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, InventoryListComponent, AuditUploadComponent, EscrowTimelineComponent, BookingRequestsComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {}
