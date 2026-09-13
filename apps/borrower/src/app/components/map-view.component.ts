import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full h-full bg-[#1A1C23] rounded-3xl overflow-hidden border border-white/5 shadow-inner">
      <!-- Simulated Dark Map Background (using CSS pattern) -->
      <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#6366F1 1px, transparent 1px); background-size: 40px 40px;"></div>
      
      <!-- Current Location Marker -->
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div class="w-32 h-32 bg-indigo-electric/10 rounded-full animate-pulse-ring absolute"></div>
        <div class="w-4 h-4 bg-indigo-electric rounded-full border-2 border-white relative z-10 shadow-glow-indigo"></div>
      </div>

      <!-- Tool Pin 1 -->
      <div class="absolute top-1/3 left-1/4 group cursor-pointer transition-transform hover:scale-110 hover:z-20">
        <div class="relative">
          <div class="w-5 h-5 bg-emerald-trust rounded-full border-2 border-[#1A1C23] shadow-glow-emerald"></div>
          <div class="absolute -top-10 -left-12 bg-obsidian/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-white pointer-events-none">
            ₹250/day <span class="text-white/40 font-normal">0.8km</span>
          </div>
        </div>
      </div>

      <!-- Tool Pin 2 -->
      <div class="absolute top-[60%] left-[70%] group cursor-pointer transition-transform hover:scale-110 hover:z-20">
        <div class="relative">
          <div class="w-5 h-5 bg-emerald-trust rounded-full border-2 border-[#1A1C23] shadow-glow-emerald"></div>
          <div class="absolute -top-10 -left-12 bg-obsidian/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-white pointer-events-none">
            ₹300/day <span class="text-white/40 font-normal">1.2km</span>
          </div>
        </div>
      </div>
      
      <!-- Tool Pin 3 -->
      <div class="absolute top-[40%] left-[80%] group cursor-pointer transition-transform hover:scale-110 hover:z-20">
        <div class="relative">
          <div class="w-5 h-5 bg-white/50 rounded-full border-2 border-[#1A1C23]"></div>
          <div class="absolute -top-10 -left-12 bg-obsidian/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-white pointer-events-none">
            ₹350/day <span class="text-white/40 font-normal">2.5km</span>
          </div>
        </div>
      </div>

      <!-- Map Controls Overlay -->
      <div class="absolute bottom-6 right-6 flex flex-col gap-2">
        <button class="w-10 h-10 glass-card rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors">
          <svg class="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        </button>
        <button class="w-10 h-10 glass-card rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors">
          <svg class="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" /></svg>
        </button>
      </div>

      <div class="absolute top-6 left-6">
         <div class="glass-pill text-xs font-medium text-white/70 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-trust"></span>
            Available Now (2)
         </div>
      </div>
    </div>
  `
})
export class MapViewComponent {}
