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
    path: 'empresas',
    loadComponent: () =>
      import('./core/features/empresas/pages/empresas-list/empresas-list').then(
        m => m.EmpresasList
      ),
  },

  {
    path: 'empresa/novo',
    loadComponent: () =>
      import('./core/features/empresas/pages/empresas-form/empresas-form').then(
        m => m.EmpresasForm
      ),
  },
  {
    path: 'empresa/:id',
    loadComponent: () =>
      import('./core/features/empresas/pages/detalhe-empresas/detalhe-empresas').then(
        m => m.DetalheEmpresas
      ),
  },
  {
    path: 'empresa/:id/editar',
    loadComponent: () =>
      import('./core/features/empresas/pages/empresas-form/empresas-form').then(
        m => m.EmpresasForm
      ),
  },

  {
    path: 'atividade/novo',
    loadComponent: () =>
      import('./core/features/atividade/pages/atividade-form/atividade-form').then(
        m => m.AtividadeForm
      ),
  },
  {
    path: 'atividade/:id',
    loadComponent: () =>
      import('./core/features/atividade/pages/detalhe-atividade/detalhe-atividade').then(
        m => m.DetalheAtividade
      ),
  },
  {
    path: 'atividade/:id/editar',
    loadComponent: () =>
      import('./core/features/atividade/pages/atividade-form/atividade-form').then(
        m => m.AtividadeForm
      ),
  },
];
