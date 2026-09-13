import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tool } from '../services/tools.mock';

@Component({
  selector: 'app-reservation-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" *ngIf="isOpen">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-obsidian/80 backdrop-blur-sm" (click)="close.emit()"></div>

      <!-- Modal Panel -->
      <div class="glass-card w-full max-w-lg relative z-10 flex flex-col max-h-full overflow-hidden animate-slide-up">
        
        <!-- Header -->
        <div class="p-6 border-b border-white/10 flex items-start justify-between">
          <div>
            <h2 class="text-xl font-bold text-white mb-1">Reserve Tool</h2>
            <p class="text-sm text-white/50">{{tool?.title}}</p>
          </div>
          <button (click)="close.emit()" class="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
            <svg class="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 overflow-y-auto">
          <!-- Date Picker Mock -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-white/70 mb-2">Select Dates</label>
            <div class="flex gap-4">
              <div class="flex-1 glass-pill bg-obsidian/50 py-3 flex flex-col px-4 cursor-pointer hover:bg-white/5 border-indigo-electric/30">
                <span class="text-xs text-white/40 mb-1">Pickup Date</span>
                <span class="text-sm font-medium text-white">Tomorrow, 10:00 AM</span>
              </div>
              <div class="flex-1 glass-pill bg-obsidian/50 py-3 flex flex-col px-4 cursor-pointer hover:bg-white/5">
                <span class="text-xs text-white/40 mb-1">Return Date</span>
                <span class="text-sm font-medium text-white">In 3 days, 10:00 AM</span>
              </div>
            </div>
          </div>

          <!-- Invoice Summary -->
          <div class="bg-slate-800/40 rounded-2xl p-5 border border-white/5">
            <h3 class="text-sm font-semibold text-white/80 mb-4">Payment Summary</h3>
            
            <div class="flex justify-between items-center mb-3 text-sm">
              <span class="text-white/60">₹{{tool?.pricePerDay}} × 3 days</span>
              <span class="tabular-nums text-white/90">₹{{(tool?.pricePerDay || 0) * 3}}</span>
            </div>
            
            <div class="flex justify-between items-center mb-3 text-sm">
              <span class="text-white/60">Platform Fee (10%)</span>
              <span class="tabular-nums text-white/90">₹{{((tool?.pricePerDay || 0) * 3 * 0.1).toFixed(0)}}</span>
            </div>

            <div class="flex justify-between items-center pb-4 mb-4 border-b border-white/10 text-sm">
              <div class="flex items-center gap-1.5 text-amber-warning">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Refundable Deposit</span>
              </div>
              <span class="tabular-nums text-amber-warning font-medium">₹{{tool?.securityDeposit}}</span>
            </div>

            <div class="flex justify-between items-center font-bold">
              <span class="text-white">Total to Pay Now</span>
              <span class="text-xl tabular-nums text-emerald-400">₹{{((tool?.pricePerDay || 0) * 3 * 1.1 + (tool?.securityDeposit || 0)).toFixed(0)}}</span>
            </div>
          </div>
          
          <div class="mt-4 flex items-start gap-2 bg-emerald-trust/10 p-3 rounded-xl border border-emerald-trust/20">
            <svg class="w-5 h-5 text-emerald-trust shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <p class="text-xs text-emerald-100/70">
              Your deposit is held securely in Escrow and automatically released 24h after return if no issues are reported.
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-6 border-t border-white/10 bg-slate-900/30">
          <button (click)="confirm.emit()" class="w-full btn-primary py-3.5 text-base flex justify-center items-center gap-2">
            Confirm Reservation
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  `
})
export class ReservationModalComponent {
  @Input() isOpen = false;
  @Input() tool: Tool | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
}
