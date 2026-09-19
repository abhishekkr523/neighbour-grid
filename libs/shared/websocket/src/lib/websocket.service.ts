import { Injectable, OnDestroy } from "@angular/core";
import { io, Socket } from "socket.io-client";
import { BehaviorSubject, Observable, Subject } from "rxjs";

export enum ConnectionStatus {
  CONNECTING = "CONNECTING",
  CONNECTED = "CONNECTED",
  DISCONNECTED = "DISCONNECTED",
  RECONNECTING = "RECONNECTING",
  ERROR = "ERROR",
}

@Injectable({
  providedIn: "root",
})
export class WebsocketService implements OnDestroy {
  private socket: Socket | null = null;
  private statusSubject = new BehaviorSubject<ConnectionStatus>(
    ConnectionStatus.DISCONNECTED,
  );

  public connectionStatus$ = this.statusSubject.asObservable();

  // Generic events stream
  private eventsSubject = new Subject<{ event: string; data: any }>();
  public events$ = this.eventsSubject.asObservable();

  constructor() {}

  connect(url: string, token: string): void {
    if (this.socket && this.socket.connected) {
      return;
    }

    this.statusSubject.next(ConnectionStatus.CONNECTING);

    this.socket = io(url, {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    this.socket.on("connect", () => {
      console.log("WebSocket connected:", this.socket?.id);
      this.statusSubject.next(ConnectionStatus.CONNECTED);
    });

    this.socket.on("disconnect", (reason) => {
      console.log("WebSocket disconnected:", reason);
      this.statusSubject.next(ConnectionStatus.DISCONNECTED);
      if (reason === "io server disconnect") {
        // the disconnection was initiated by the server, you need to reconnect manually
        this.socket?.connect();
      }
    });

    this.socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
      this.statusSubject.next(ConnectionStatus.ERROR);
    });

    // Listen to all events generically
    this.socket.onAny((event, ...args) => {
      this.eventsSubject.next({
        event,
        data: args.length === 1 ? args[0] : args,
      });
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  send(event: string, data?: any): void {
    if (this.socket && this.socket.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn("Cannot send event, socket is not connected:", event);
    }
  }

  on<T>(event: string, callback: (data: T) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event: string): void {
    if (this.socket) {
      this.socket.off(event);
    }
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}
