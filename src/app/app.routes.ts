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
  // 'atividade/novo' precisa vir ANTES de 'atividade/:id' — o Router testa
  // as rotas na ordem do array, e ':id' casaria com "novo" como se fosse
  // um id, roubando a rota antes dela ser alcançada.
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
];
