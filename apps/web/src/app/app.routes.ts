import { Routes } from "@angular/router";
import { loadRemoteModule } from "@angular-architects/native-federation";

export const appRoutes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "admin", // सीधे टेस्ट करने के लिए admin पर भेजें
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
