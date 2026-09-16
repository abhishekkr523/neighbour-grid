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
import { Tool } from "../app";
import * as LeafletModule from "leaflet";
const L: any =
  (LeafletModule as any).default?.default ??
  (LeafletModule as any).default ??
  (LeafletModule as any);
@Component({
  selector: "app-map-view",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="relative w-full h-full bg-[#1A1C23] rounded-3xl overflow-hidden border border-white/5 shadow-inner"
    >
      <div id="map" class="w-full h-full z-0"></div>

      <!-- Overlay controls (can be adjusted via CSS if needed, or we use Leaflet controls) -->
      <div class="absolute top-6 left-6 z-10">
        <div
          class="glass-pill text-xs font-medium text-white flex items-center gap-2 bg-[#1A1C23]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg"
        >
          <span class="w-2 h-2 rounded-full bg-[#10B981]"></span>
          Available Nearby ({{ tools.length }})
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      /* Leaflet overrides for dark theme */
      :host ::ng-deep .leaflet-tile {
        position: absolute;
      }
      :host ::ng-deep .leaflet-marker-icon {
        position: absolute;
        left: 0;
        top: 0;
      }

      :host ::ng-deep .leaflet-marker-shadow {
        position: absolute;
      }

      :host ::ng-deep .leaflet-marker-pane {
        z-index: 6;
      }
      :host ::ng-deep .leaflet-container {
        background: #1a1c23;
        font-family: inherit;
      }
      :host ::ng-deep .leaflet-popup-content-wrapper {
        background: rgba(26, 28, 35, 0.9);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
      }
      :host ::ng-deep .leaflet-popup-tip {
        background: rgba(26, 28, 35, 0.9);
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        border-left: 1px solid rgba(255, 255, 255, 0.1);
      }
      :host ::ng-deep .leaflet-popup-content {
        margin: 12px;
        font-weight: 500;
      }
      :host ::ng-deep .leaflet-control-zoom {
        border: none !important;
        background: transparent !important;
        box-shadow: none !important;
      }
      :host ::ng-deep .leaflet-control-zoom a {
        background-color: rgba(26, 28, 35, 0.8) !important;
        backdrop-filter: blur(8px);
        color: rgba(255, 255, 255, 0.7) !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        border-radius: 8px !important;
        margin-bottom: 8px;
      }
      :host ::ng-deep .leaflet-control-zoom a:hover {
        background-color: rgba(255, 255, 255, 0.1) !important;
        color: white !important;
      }

      /* Custom Marker CSS */
      /* ================================
   Leaflet Custom Markers
   ================================ */

      :host ::ng-deep .tool-marker {
        display: flex !important;
        align-items: center;
        justify-content: center;
        position: relative;
        background: transparent !important;
        border: none !important;
      }

      :host ::ng-deep .tool-marker .dot {
        width: 20px;
        height: 20px;
        background: #10b981;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 0 12px #10b981;
      }

      :host ::ng-deep .tool-marker.active .dot {
        transform: scale(1.3);
        background: #34d399;
        box-shadow: 0 0 20px #10b981;
      }

      @keyframes map-pulse {
        0% {
          transform: scale(1);
          opacity: 0.8;
        }

        100% {
          transform: scale(3.5);
          opacity: 0;
        }
      }
    `,
  ],
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
