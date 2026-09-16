import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: User;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  private apiUrl = "http://localhost:3000/api/v1/auth";

  // Signals for reactive UI updates
  isAuthenticated = signal<boolean>(false);
  currentUser = signal<User | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.checkInitialState();
  }

  private checkInitialState() {
    const token = localStorage.getItem("ng_token");
    const userStr = localStorage.getItem("ng_user");

    if (token && userStr) {
      this.isAuthenticated.set(true);
      this.currentUser.set(JSON.parse(userStr));
    }
  }

  login(credentials: any): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(tap((res) => this.handleAuthSuccess(res)));
  }

  register(userData: any): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, userData)
      .pipe(tap((res) => this.handleAuthSuccess(res)));
  }

  logout() {
    const refreshToken = localStorage.getItem("ng_refresh_token");
    console.log("Logging out, refresh token:", refreshToken);
    this.http.post(`${this.apiUrl}/logout`, { refreshToken }).subscribe({
      next: () => this.clearState(),
      error: () => this.clearState(), // Clear state even if server fails
    });
  }

  private handleAuthSuccess(res: AuthResponse) {
    localStorage.setItem("ng_token", res.accessToken);
    localStorage.setItem("ng_refresh_token", res.refreshToken);
    localStorage.setItem("ng_user", JSON.stringify(res.user));
    this.isAuthenticated.set(true);
    this.currentUser.set(res.user);
    this.router.navigate(["/"]);
  }

  private clearState() {
    localStorage.removeItem("ng_token");
    localStorage.removeItem("ng_user");
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.router.navigate(["/login"]);
  }

  getToken(): string | null {
    return localStorage.getItem("ng_token");
  }
}
