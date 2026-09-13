import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resolution-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="glass-card p-6">
      <h3 class="text-lg font-bold text-white mb-4">Resolution Decision</h3>
      
      <div class="mb-5">
        <label class="block text-sm font-medium text-white/70 mb-2">Admin Internal Notes</label>
        <textarea rows="3" class="w-full bg-obsidian border border-white/10 rounded-xl p-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-electric focus:ring-1 focus:ring-indigo-electric transition-colors" placeholder="Document reason for resolution..."></textarea>
      </div>

      <div class="flex gap-4">
        <button class="flex-1 btn-amber py-3 flex flex-col items-center justify-center gap-1 group">
          <span class="text-sm font-bold">Release to Owner</span>
          <span class="text-[10px] opacity-70">Damage Confirmed</span>
        </button>
        <button class="flex-1 btn-emerald py-3 flex flex-col items-center justify-center gap-1">
          <span class="text-sm font-bold">Refund Borrower</span>
          <span class="text-[10px] opacity-70">Clean Return</span>
        </button>
      </div>
    </div>
  `
})
export class ResolutionPanelComponent {}
