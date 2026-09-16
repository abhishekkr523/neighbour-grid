import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div
      class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <!-- Animated Background Orbs -->
      <div
        class="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-electric/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"
      ></div>
      <div
        class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-trust/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"
      ></div>

      <div class="max-w-md w-full space-y-8 glass-card p-10 relative z-10">
        <div>
          <h2
            class="text-center text-3xl font-extrabold text-white tracking-tight"
          >
            Welcome back
          </h2>
          <p class="mt-2 text-center text-sm text-white/50">
            Or
            <a
              routerLink="/signup"
              class="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              create a new account
            </a>
          </p>
        </div>

        <form
          class="mt-8 space-y-6"
          [formGroup]="loginForm"
          (ngSubmit)="onSubmit()"
        >
          <div
            *ngIf="errorMessage"
            class="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm text-center"
          >
            {{ errorMessage }}
          </div>

          <div class="space-y-4">
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-white/70 mb-1"
                >Email address</label
              >
              <input
                id="email"
                type="email"
                formControlName="email"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-electric focus:border-transparent transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                for="password"
                class="block text-sm font-medium text-white/70 mb-1"
                >Password</label
              >
              <input
                id="password"
                type="password"
                formControlName="password"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-electric focus:border-transparent transition-all"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              [disabled]="loginForm.invalid || isSubmitting"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-electric hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-electric disabled:opacity-50 disabled:cursor-not-allowed transition-all relative overflow-hidden group"
            >
              <span
                class="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"
              ></span>
              <span class="relative">{{
                isSubmitting ? "Signing in..." : "Sign in"
              }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;
  errorMessage = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = "";

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.router.navigate(["/borrower"]);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.errorMessage = err.error?.error || "Invalid credentials";
        },
      });
    }
  }
}
