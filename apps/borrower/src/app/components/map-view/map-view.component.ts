import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  Inject,
  PLATFORM_ID,
} from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { Tool } from "../../app";
import * as LeafletModule from "leaflet";
const L: any =
  (LeafletModule as any).default?.default ??
  (LeafletModule as any).default ??
  (LeafletModule as any);
@Component({
  selector: "app-map-view",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "map-view.component.html",
  styleUrl: "map-view.component.scss",
})
export class MapViewComponent implements OnInit, OnChanges, OnDestroy {
  @Input() userLat: number = 28.6139;
  @Input() userLng: number = 77.209;
  @Input() radius: number = 10; // km
  @Input() tools: Tool[] = [];
  @Input() activeToolId: string | null = null;

  private map: any;
  private userMarker: any;
  private radiusCircle: any;
  private toolMarkers: Record<string, any> = {};
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.initMap();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.map) return;

    if (changes["userLat"] || changes["userLng"]) {
      this.updateUserLocation();
    }

    if (changes["radius"] || changes["userLat"] || changes["userLng"]) {
      this.updateRadiusCircle();
    }

    if (changes["tools"]) {
      this.updateToolMarkers();
    }

    if (changes["activeToolId"]) {
      this.highlightActiveTool();
    }
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }
  private initMap() {
    const lat = Number(this.userLat);
    const lng = Number(this.userLng);

    console.log("Map coordinates:", { lat, lng });

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      console.error("Invalid user coordinates:", {
        userLat: this.userLat,
        userLng: this.userLng,
      });
      return;
    }

    this.map = L.map("map", {
      zoomControl: false,
      center: [lat, lng],
      zoom: 12,
    });

    L.control
      .zoom({
        position: "bottomright",
      })
      .addTo(this.map);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png?key=cb1_3maj_1_327ff248bf866e40b9d75409",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; CARTO',
        subdomains: "abcd",
        maxZoom: 20,
      },
    ).addTo(this.map);

    // ============================
    // USER MARKER
    // ============================

    const userIcon = L.divIcon({
      className: "",
      html: `
      <div style="
        width: 28px;
        height: 28px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <!-- Pulse -->
        <div style="
          position: absolute;
          width: 28px;
          height: 28px;
          background: rgba(6, 182, 212, 0.35);
          border-radius: 50%;
          animation: neighborGridPulse 2s ease-out infinite;
        "></div>

        <!-- Main dot -->
        <div style="
          position: relative;
          width: 16px;
          height: 16px;
          background: #06b6d4;
          border: 3px solid #ffffff;
          border-radius: 50%;
          box-shadow:
            0 0 8px #06b6d4,
            0 0 18px rgba(6, 182, 212, 0.8);
          z-index: 2;
        "></div>
      </div>

      <style>
        @keyframes neighborGridPulse {
          0% {
            transform: scale(0.7);
            opacity: 0.8;
          }

          70% {
            transform: scale(1.8);
            opacity: 0;
          }

          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }
      </style>
    `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    this.userMarker = L.marker([lat, lng], {
      icon: userIcon,
      zIndexOffset: 1000,
    }).addTo(this.map);

    // ============================
    // RADIUS
    // ============================

    this.radiusCircle = L.circle([lat, lng], {
      radius: Number(this.radius) * 1000,
      color: "#3b82f6",
      weight: 2,
      fillColor: "#3b82f6",
      fillOpacity: 0.15,
    }).addTo(this.map);

    // Make sure marker stays above the circle
    this.userMarker.setZIndexOffset(1000);

    this.updateToolMarkers();

    setTimeout(() => {
      this.map.invalidateSize(true);
      this.map.setView([lat, lng], 12);

      // Force marker above other layers
      if (this.userMarker) {
        this.userMarker.setZIndexOffset(1000);
      }
    }, 300);
  }

  private updateUserLocation() {
    if (!this.map || !this.userMarker) {
      return;
    }

    const lat = Number(this.userLat);
    const lng = Number(this.userLng);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      console.error("Invalid user location:", {
        lat,
        lng,
      });
      return;
    }

    const location: [number, number] = [lat, lng];

    this.userMarker.setLatLng(location);
    this.userMarker.setZIndexOffset(1000);

    this.map.setView(location, this.map.getZoom());
  }
  private updateRadiusCircle() {
    if (!this.radiusCircle) {
      return;
    }

    const lat = Number(this.userLat);
    const lng = Number(this.userLng);
    const radius = Number(this.radius);

    if (
      !Number.isFinite(lat) ||
      !Number.isFinite(lng) ||
      !Number.isFinite(radius)
    ) {
      return;
    }

    this.radiusCircle.setLatLng([lat, lng]);
    this.radiusCircle.setRadius(radius * 1000);
  }

  private updateToolMarkers() {
    if (!this.map) {
      return;
    }

    Object.values(this.toolMarkers).forEach((marker: any) => {
      marker.remove();
    });

    this.toolMarkers = {};

    const toolIcon = L.divIcon({
      className: "",
      html: `
      <div style="
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 16px;
          height: 16px;
          background: #10b981;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow:
            0 0 8px #10b981,
            0 0 16px rgba(16, 185, 129, 0.7);
        "></div>
      </div>
    `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12],
    });

    this.tools.forEach((tool) => {
      const lat = Number(tool.latitude);
      const lng = Number(tool.longitude);

      if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
        return;
      }

      const marker = L.marker([lat, lng], {
        icon: toolIcon,
        zIndexOffset: 500,
      }).bindPopup(`
      <div class="flex flex-col gap-1">
        <div class="text-sm font-bold truncate">
          ${tool.title}
        </div>

        <div class="text-xs text-white/70">
          ₹${tool.pricePerDay}/day • ${tool.distanceKm ?? "?"} km
        </div>
      </div>
    `);

      marker.addTo(this.map);

      this.toolMarkers[tool.id] = marker;
    });
  }

  private highlightActiveTool() {
    Object.keys(this.toolMarkers).forEach((id) => {
      const el = this.toolMarkers[id].getElement();
      if (el) {
        el.classList.remove("active");
        this.toolMarkers[id].setZIndexOffset(0);
      }
    });

    if (this.activeToolId && this.toolMarkers[this.activeToolId]) {
      const marker = this.toolMarkers[this.activeToolId];
      const el = marker.getElement();
      if (el) {
        el.classList.add("active");
        marker.setZIndexOffset(500);
      }
      this.map.panTo(marker.getLatLng());
    }
  }
}
