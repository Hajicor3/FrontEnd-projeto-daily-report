import { Routes } from '@angular/router';
import { Dashboard } from './core/features/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./core/features/dashboard/dashboard').then(m => Dashboard),
  },
];
