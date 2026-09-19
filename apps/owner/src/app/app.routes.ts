import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'tools/new',
    loadComponent: () =>
      import('./components/tool-form/tool-form.component').then((m) => m.ToolFormComponent),
  },
  {
    path: 'tools/:id/edit',
    loadComponent: () =>
      import('./components/tool-form/tool-form.component').then((m) => m.ToolFormComponent),
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./components/chat-page/chat-page.component').then((m) => m.ChatPageComponent),
  }
];
