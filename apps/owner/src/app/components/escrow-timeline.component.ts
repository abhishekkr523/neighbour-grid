import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-escrow-timeline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="glass-card p-6">
      <h3 class="text-lg font-bold text-white mb-6">Active Escrow Lifecycle</h3>

      <div class="relative">
        <!-- Connecting Line -->
        <div class="absolute top-4 left-4 right-4 h-0.5 bg-white/10 z-0"></div>
        <div class="absolute top-4 left-4 h-0.5 bg-emerald-trust z-0 transition-all duration-1000" style="width: 50%;"></div>

        <!-- Stages -->
        <div class="relative z-10 flex justify-between">
          <!-- Stage 1 -->
          <div class="flex flex-col items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-emerald-trust flex items-center justify-center shadow-glow-emerald">
              <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <div class="text-center">
              <div class="text-xs font-bold text-white">Security Held</div>
              <div class="text-[10px] text-white/50">₹1,500 Frozen</div>
            </div>
          </div>

          <!-- Stage 2 -->
          <div class="flex flex-col items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-emerald-trust flex items-center justify-center shadow-glow-emerald">
              <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <div class="text-center">
              <div class="text-xs font-bold text-white">Rental Active</div>
              <div class="text-[10px] text-white/50">In Progress</div>
            </div>
          </div>

          <!-- Stage 3 (Current) -->
          <div class="flex flex-col items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-obsidian border-2 border-amber-warning flex items-center justify-center shadow-glow-amber">
              <div class="w-2.5 h-2.5 rounded-full bg-amber-warning animate-pulse"></div>
            </div>
            <div class="text-center">
              <div class="text-xs font-bold text-amber-warning">Return Insp.</div>
              <div class="text-[10px] text-amber-warning/70 font-medium">18h remaining</div>
            </div>
          </div>

          <!-- Stage 4 -->
          <div class="flex flex-col items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-obsidian border-2 border-white/20 flex items-center justify-center">
              <svg class="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <div class="text-center opacity-50">
              <div class="text-xs font-bold text-white">Deposit Released</div>
              <div class="text-[10px] text-white/50">Pending</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class EscrowTimelineComponent {}
