import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./core/features/dashboard/dashboard').then(m => m.Dashboard),
  },
  {
    path: 'atividades',
    loadComponent: () =>
      import('./core/features/atividade/pages/atividade-list/atividade-list').then(
        m => m.AtividadeList
      ),
  },
  {
    path: 'atividade/novo',
    loadComponent: () =>
      import('./core/features/atividade/pages/atividade-form/atividade-form').then(
        m => m.AtividadeForm
      ),
  },
];
