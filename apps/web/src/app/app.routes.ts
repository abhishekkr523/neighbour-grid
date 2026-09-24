import { Routes } from "@angular/router";
import { loadRemoteModule } from "@angular-architects/native-federation";

export const appRoutes: Routes = [
  {
    path: "login",
    loadComponent: () =>
      import("./components/login/login.component").then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: "signup",
    loadComponent: () =>
      import("./components/signup/signup.component").then(
        (m) => m.SignupComponent,
      ),
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "borrower",
  },
  {
    path: "admin",
    loadComponent: () =>
      loadRemoteModule({
        remoteName: "admin",
        exposedModule: "./Component",
      }).then((m) => m.App ?? m.AppComponent),
  },
  {
    path: "borrower",
    loadComponent: () =>
      loadRemoteModule({
        remoteName: "borrower",
        exposedModule: "./Component",
      }).then((m) => m.App ?? m.AppComponent),
  },
  {
    path: "owner",
    loadChildren: () =>
      loadRemoteModule({
        remoteName: "owner",
        exposedModule: "./Routes",
      }).then((m) => m.appRoutes ?? m.AppComponent),
  },
  {
    path: "chat",
    loadComponent: () =>
      import("@neighbour-grid/chat").then((m) => m.Chat),
  }
];
