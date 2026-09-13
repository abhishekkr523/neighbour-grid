import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-comparison',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="glass-card p-6 h-full flex flex-col">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-bold text-white">Visual Audit Comparison</h3>
        <div class="flex gap-2">
          <button class="px-3 py-1 bg-white/5 rounded-lg text-xs font-medium hover:bg-white/10 transition-colors">Overview</button>
          <button class="px-3 py-1 bg-indigo-electric text-white rounded-lg text-xs font-medium">Wear Points</button>
          <button class="px-3 py-1 bg-white/5 rounded-lg text-xs font-medium hover:bg-white/10 transition-colors">Serial Number</button>
        </div>
      </div>

      <div class="flex-1 grid grid-cols-2 gap-6 min-h-[400px]">
        <!-- Pre-Handover (Pickup) -->
        <div class="flex flex-col gap-3 h-full">
          <div class="flex justify-between items-center px-1">
            <span class="text-sm font-semibold text-white/80">Pre-Handover (Owner)</span>
            <span class="text-xs text-white/40">Oct 24, 10:00 AM</span>
          </div>
          <div class="flex-1 rounded-2xl overflow-hidden bg-obsidian border border-white/5 relative group cursor-zoom-in">
            <img src="https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=800&auto=format&fit=crop" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
            </div>
          </div>
        </div>

        <!-- Post-Return -->
        <div class="flex flex-col gap-3 h-full">
          <div class="flex justify-between items-center px-1">
            <span class="text-sm font-semibold text-white/80">Post-Return (Borrower)</span>
            <span class="text-xs text-white/40">Oct 26, 11:30 AM</span>
          </div>
          <div class="flex-1 rounded-2xl overflow-hidden bg-obsidian border border-red-500/30 relative group cursor-zoom-in shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <img src="https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=800&auto=format&fit=crop" class="w-full h-full object-cover filter contrast-125 sepia-[.2]">
            <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PhotoComparisonComponent {}
