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
  selector: "app-signup",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div
      class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <!-- Animated Background Orbs -->
      <div
        class="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-electric/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"
      ></div>
      <div
        class="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-trust/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"
      ></div>

      <div class="max-w-md w-full space-y-8 glass-card p-10 relative z-10">
        <div>
          <h2
            class="text-center text-3xl font-extrabold text-white tracking-tight"
          >
            Join NeighborGrid
          </h2>
          <p class="mt-2 text-center text-sm text-white/50">
            Already have an account?
            <a
              routerLink="/login"
              class="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Sign in instead
            </a>
          </p>
        </div>

        <form
          class="mt-8 space-y-6"
          [formGroup]="signupForm"
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
                for="name"
                class="block text-sm font-medium text-white/70 mb-1"
                >Full Name</label
              >
              <input
                id="name"
                type="text"
                formControlName="name"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-electric focus:border-transparent transition-all"
                placeholder="John Doe"
              />
            </div>

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
                placeholder="you@example.com"
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
                placeholder="Min. 6 characters"
              />
            </div>

            <div>
              <label
                for="phone_number"
                class="block text-sm font-medium text-white/70 mb-1"
                >Phone Number (Optional)</label
              >
              <input
                id="phone_number"
                type="text"
                formControlName="phone_number"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-electric focus:border-transparent transition-all"
                placeholder="+91 9876543210"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-white/70 mb-2"
                >I want to...</label
              >
              <div class="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  (click)="setRole('BORROWER')"
                  [class.bg-indigo-electric]="
                    signupForm.get('role')?.value === 'BORROWER'
                  "
                  [class.border-indigo-400]="
                    signupForm.get('role')?.value === 'BORROWER'
                  "
                  [class.bg-white-5]="
                    signupForm.get('role')?.value !== 'BORROWER'
                  "
                  class="border border-white/10 rounded-xl py-2 px-4 text-sm font-medium text-white transition-all"
                >
                  Borrow Tools
                </button>
                <button
                  type="button"
                  (click)="setRole('OWNER')"
                  [class.bg-emerald-trust]="
                    signupForm.get('role')?.value === 'OWNER'
                  "
                  [class.border-emerald-400]="
                    signupForm.get('role')?.value === 'OWNER'
                  "
                  [class.bg-white-5]="signupForm.get('role')?.value !== 'OWNER'"
                  class="border border-white/10 rounded-xl py-2 px-4 text-sm font-medium text-white transition-all"
                >
                  Lend Tools
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              [disabled]="signupForm.invalid || isSubmitting"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-electric hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-electric disabled:opacity-50 disabled:cursor-not-allowed transition-all relative overflow-hidden group"
            >
              <span
                class="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"
              ></span>
              <span class="relative">{{
                isSubmitting ? "Creating account..." : "Create account"
              }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class SignupComponent {
  signupForm: FormGroup;
  isSubmitting = false;
  errorMessage = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.signupForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      phone_number: [""],
      role: ["BORROWER", Validators.required],
    });
  }

  setRole(role: string) {
    this.signupForm.patchValue({ role });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = "";

      this.authService.register(this.signupForm.value).subscribe({
        next: () => {
          // Success is handled by AuthService (navigation)
        },
        error: (err) => {
          this.isSubmitting = false;
          this.errorMessage = err.error?.error || "Error creating account";
        },
      });
    }
  }
}
