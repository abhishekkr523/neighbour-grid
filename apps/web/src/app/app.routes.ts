import { Routes } from "@angular/router";
import { loadRemoteModule } from "@angular-architects/native-federation";

export const appRoutes: Routes = [
  {
    path: "v",
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
    loadComponent: () =>
      loadRemoteModule({
        remoteName: "owner",
        exposedModule: "./Component",
      }).then((m) => m.App ?? m.AppComponent),
  },
];
