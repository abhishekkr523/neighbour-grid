import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audit-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="glass-card p-6">
      <div class="flex justify-between items-start mb-6">
        <div>
          <h3 class="text-lg font-bold text-white mb-1">Pre-Handover Visual Audit</h3>
          <p class="text-sm text-white/50">Document tool condition before loaning to activate rental.</p>
        </div>
        <div class="badge-emerald">Required</div>
      </div>

      <!-- 4-Quadrant Grid -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div *ngFor="let quadrant of quadrants" 
             class="border-2 border-dashed border-white/10 rounded-2xl h-32 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-electric/50 hover:bg-white/5 transition-colors relative overflow-hidden group">
          <ng-container *ngIf="!quadrant.uploaded">
            <svg class="w-6 h-6 text-white/30 mb-2 group-hover:text-indigo-electric transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="text-xs font-medium text-white/50 group-hover:text-white transition-colors">{{quadrant.name}}</span>
          </ng-container>
          <ng-container *ngIf="quadrant.uploaded">
             <div class="absolute inset-0 bg-emerald-trust/20 flex items-center justify-center backdrop-blur-sm">
                <svg class="w-8 h-8 text-emerald-trust" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
             </div>
             <div class="absolute bottom-2 right-2 bg-obsidian/80 px-2 py-0.5 rounded text-[10px] text-white/70 backdrop-blur-md">
                Just now
             </div>
          </ng-container>
        </div>
      </div>

      <button class="w-full btn-primary py-2.5 text-sm" (click)="simulateUpload()">
        Upload All Photos
      </button>
    </div>
  `
})
export class AuditUploadComponent {
  quadrants = [
    { name: 'Front / Overview', uploaded: false },
    { name: 'Motor / Core', uploaded: false },
    { name: 'Blade / Bit / Wear', uploaded: false },
    { name: 'Serial Number', uploaded: false }
  ];

  simulateUpload() {
    this.quadrants.forEach(q => q.uploaded = true);
  }
}
