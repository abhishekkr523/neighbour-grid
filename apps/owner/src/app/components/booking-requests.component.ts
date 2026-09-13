import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-requests',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="glass-card p-6">
      <h3 class="text-lg font-bold text-white mb-4">Pending Requests</h3>
      
      <div class="space-y-4">
        <div class="bg-slate-800/40 border border-white/5 rounded-2xl p-4">
          <div class="flex justify-between items-start mb-3">
            <div>
              <h4 class="font-bold text-white text-sm">Makita Angle Grinder</h4>
              <p class="text-xs text-white/50">Requested by Rohan (4.8 ★)</p>
            </div>
            <div class="text-right">
              <div class="text-sm font-bold tabular-nums text-emerald-400">₹600</div>
              <div class="text-xs text-white/40">2 days</div>
            </div>
          </div>
          
          <div class="flex gap-2 text-xs mb-4 text-white/70 bg-obsidian/50 px-3 py-2 rounded-lg">
            <span>Oct 24, 10:00 AM</span>
            <span class="text-white/30">→</span>
            <span>Oct 26, 10:00 AM</span>
          </div>

          <div class="flex gap-3">
            <button class="flex-1 btn-emerald py-2 text-sm">Accept</button>
            <button class="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl py-2 text-sm transition-colors border border-white/10">Decline</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class BookingRequestsComponent {}
