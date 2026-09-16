import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ToolCardComponent } from "./components/tool-card.component";
import { MapViewComponent } from "./components/map-view.component";
import { ReservationModalComponent } from "./components/reservation-modal.component";

// Define the Tool interface based on the backend schema
export interface Tool {
  id: string;
  title: string;
  description: string;
  category: string;
  price_per_day: string | number;
  security_deposit: string | number;
  latitude: number;
  longitude: number;
  distance_km?: number;
  pricePerDay?: number;
  securityDeposit?: number;
  distanceKm?: number;
  ownerName?: string;
  ownerRating?: string | number;
  loanCount?: number;
  imageUrl?: string;
  hasVerifiedAudit?: boolean;
  [key: string]: any; // Allow other properties
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ToolCardComponent,
    MapViewComponent,
    ReservationModalComponent,
  ],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App implements OnInit {
  tools: Tool[] = [];
  selectedTool: Tool | null = null;
  activeToolId: string | null = null;
  isModalOpen = false;
  isLoading = false;
  isLocating = false;

  // Default coordinates (e.g., New Delhi if geolocation fails)
  userLat = 25.5941;
  userLng = 85.1376;

  searchRadius = 100000000;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.locateMe();
  }

  locateMe() {
    this.isLocating = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLat = position.coords.latitude;
          this.userLng = position.coords.longitude;
          this.isLocating = false;
          this.fetchNearbyTools();
        },
        (error) => {
          console.warn("Geolocation denied or failed. Using default.", error);
          this.isLocating = false;
          this.fetchNearbyTools();
        },
      );
    } else {
      this.isLocating = false;
      this.fetchNearbyTools();
    }
  }

  fetchNearbyTools() {
    this.isLoading = true;
    const url = `http://localhost:3000/api/v1/tools/nearby?lat=${this.userLat}&lng=${this.userLng}&radius=${this.searchRadius}`;

    this.http.get<{ result: any[] }>(url).subscribe({
      next: (res) => {
        console.log("✅ API RESPONSE:", res);
        this.tools = (res.result || []).map((t) => ({
          ...t,
          distanceKm: t.distance_km,
          pricePerDay: Number(t.price_per_day) || 0,
          securityDeposit: Number(t.security_deposit) || 0,
          ownerName: t.owner_name || "Neighbor",
          ownerRating: t.owner_rating_avg || "4.8",
          loanCount: Math.floor(Math.random() * 20) + 1,
          imageUrl:
            t.image_url ||
            "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
          hasVerifiedAudit: Math.random() > 0.5,
        }));
        console.log("✅ PROCESSED TOOLS:", this.tools.length);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Failed to fetch tools", err);
        this.tools = [];
        this.isLoading = false;
      },
    });
  }
  ok() {
    console.log("✅ PROCESSED TOOLS:", this.tools.length);
  }

  onRadiusChange(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log("Radius change event:", input.value);
    this.searchRadius = Number(input.value);
    this.fetchNearbyTools();
  }

  onToolHover(toolId: string) {
    this.activeToolId = toolId;
  }

  onToolLeave() {
    this.activeToolId = null;
  }

  openReservationModal(tool: Tool) {
    this.selectedTool = tool;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    setTimeout(() => (this.selectedTool = null), 300); // wait for animation
  }

  confirmReservation(tool: Tool) {
    alert(`Reservation requested for ${tool.title}!`);
    this.closeModal();
  }
}
