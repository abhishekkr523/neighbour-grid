import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Dispute {
  id: string;
  toolName: string;
  borrowerName: string;
  ownerName: string;
  status: 'OPEN' | 'RESOLVED_OWNER' | 'RESOLVED_BORROWER';
  reason: string;
  date: string;
  escrowAmount: number;
}

@Component({
  selector: 'app-dispute-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="glass-card-hover p-4 cursor-pointer" (click)="select.emit(dispute)" [class.border-indigo-electric]="isSelected">
      <div class="flex justify-between items-start mb-2">
        <h4 class="font-bold text-white text-sm">{{dispute.toolName}}</h4>
        <span *ngIf="dispute.status === 'OPEN'" class="badge-amber">OPEN</span>
        <span *ngIf="dispute.status !== 'OPEN'" class="badge-emerald">RESOLVED</span>
      </div>
      
      <p class="text-xs text-white/50 mb-3 line-clamp-2">{{dispute.reason}}</p>
      
      <div class="flex justify-between items-end">
        <div class="flex items-center gap-2 text-[10px] text-white/40">
          <span>{{dispute.ownerName}} (Owner)</span>
          <span>vs</span>
          <span>{{dispute.borrowerName}} (Borrower)</span>
        </div>
        <div class="text-xs font-medium text-emerald-400 tabular-nums">
          ₹{{dispute.escrowAmount}} Frozen
        </div>
      </div>
    </div>
  `
})
export class DisputeCardComponent {
  @Input() dispute!: Dispute;
  @Input() isSelected = false;
  @Output() select = new EventEmitter<Dispute>();
}
