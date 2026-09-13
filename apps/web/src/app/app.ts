import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  imports: [CommonModule, RouterModule, RouterOutlet],
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  activeRole: "borrower" | "owner" | "admin" = "borrower";
  locationLabel = "Indiranagar, Sector 4";
  radiusKm = 2.5;
  walletBalance = 4250; // cents
  escrowHeld = 1500; // cents
  escrowCountdownHours = 18;
  showNotification = true;

  get walletDisplay(): string {
    return "₹" + (this.walletBalance / 100).toFixed(0);
  }

  get escrowDisplay(): string {
    return "₹" + (this.escrowHeld / 100).toFixed(0);
  }

  switchRole(role: "borrower" | "owner" | "admin") {
    this.activeRole = role;
  }

  dismissNotification() {
    this.showNotification = false;
  }
}
