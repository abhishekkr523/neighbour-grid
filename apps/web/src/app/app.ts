import { Component } from "@angular/core";
import { RouterModule, RouterOutlet, Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from "./services/auth.service";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { LoaderService } from "./services/loader.service";

@Component({
  imports: [CommonModule, RouterModule, RouterOutlet, SpinnerComponent],
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  constructor(
    public authService: AuthService,
    private router: Router,
    private loaderService: LoaderService
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.show();
      }
      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loaderService.hide();
      }
    });
  }

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
  logout() {
    this.authService.logout();
  }
}
