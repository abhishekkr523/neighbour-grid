import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface InventoryItem {
  id: string;
  title: string;
  imageUrl: string;
  pricePerDay: number;
  isActive: boolean;
  activeLoans: number;
  totalEarnings: number;
  pendingRequests: number;
}

@Component({
  selector: 'app-inventory-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="glass-card p-5 relative overflow-hidden group">
      <div class="flex gap-4">
        <!-- Thumbnail -->
        <div class="w-24 h-24 rounded-xl overflow-hidden shrink-0">
          <img [src]="item.imageUrl" [alt]="item.title" class="w-full h-full object-cover">
        </div>
        
        <!-- Details -->
        <div class="flex-1">
          <div class="flex justify-between items-start mb-1">
            <h3 class="font-bold text-white text-lg leading-tight">{{item.title}}</h3>
            <!-- Toggle -->
            <button (click)="toggleActive.emit(item)" class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none" [class.bg-emerald-trust]="item.isActive" [class.bg-slate-700]="!item.isActive">
              <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" [class.translate-x-6]="item.isActive" [class.translate-x-1]="!item.isActive"></span>
            </button>
          </div>
          
          <div class="text-sm font-medium tabular-nums text-emerald-400 mb-3">₹{{item.pricePerDay}} / day</div>
          
          <!-- Stats -->
          <div class="flex gap-4 text-xs text-white/50">
            <div class="flex flex-col gap-1">
              <span>Active Loans</span>
              <span class="text-white font-medium">{{item.activeLoans}}</span>
            </div>
            <div class="flex flex-col gap-1 border-l border-white/10 pl-4">
              <span>Total Earnings</span>
              <span class="text-white font-medium tabular-nums">₹{{item.totalEarnings}}</span>
            </div>
            <div *ngIf="item.pendingRequests > 0" class="flex flex-col gap-1 border-l border-white/10 pl-4">
              <span class="text-amber-warning">Requests</span>
              <span class="text-amber-warning font-bold">{{item.pendingRequests}} new</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class InventoryCardComponent {
  @Input() item!: InventoryItem;
  @Output() toggleActive = new EventEmitter<InventoryItem>();
}
