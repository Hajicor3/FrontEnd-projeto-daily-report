import { CategoriaAtividade } from './categoria-atividade.enum';

// Espelha o AtividadeRequest do backend (record Java).
// Diferente de Atividade/EmpresaModel, aqui uso uma interface em vez de uma
// classe: é só um "formato de dados" para enviar na requisição, sem
// nenhum comportamento próprio, então não precisa de construtor.
export interface AtividadeRequest {
  data: string; // LocalDate no backend -> string "yyyy-MM-dd" (formato que <input type="date"> já produz)
  titulo: string;
  descricao?: string;
  empresaId: number; // Long no backend -> number no TypeScript
  projeto?: string;
  categoria: CategoriaAtividade;
  horaInicio: string; // LocalTime no backend -> string "HH:mm" (<input type="time">)
  horaFim: string;
  observacao?: string;
}
