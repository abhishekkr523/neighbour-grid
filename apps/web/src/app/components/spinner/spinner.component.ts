import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoaderService } from "../../services/loader.service";

@Component({
  selector: "app-spinner",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="loaderService.isLoading()"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-sm"
    >
      <div class="relative w-16 h-16">
        <!-- Outer spinning ring -->
        <div
          class="absolute inset-0 rounded-full border-4 border-indigo-100"
        ></div>
        <div
          class="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"
        ></div>

        <!-- Inner pulse (optional visual flair) -->
        <div
          class="absolute inset-3 rounded-full bg-indigo-100 animate-pulse"
        ></div>
      </div>
    </div>
  `,
})
export class SpinnerComponent {
  loaderService = inject(LoaderService);
}
