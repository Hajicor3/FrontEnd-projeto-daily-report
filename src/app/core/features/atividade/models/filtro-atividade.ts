import { CategoriaAtividade } from './categoria-atividade.enum';
export interface FiltroAtividade {
  data: string | null;
  empresaId: number | null;
  projeto: string | null;
  categoria: CategoriaAtividade | null;
  dataInicial: string | null;
  dataFinal: string | null;
}
