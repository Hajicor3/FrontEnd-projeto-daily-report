import { CategoriaAtividade } from "./categoria-atividade.enum";

export class Atividade {
  id: number;
  data: string;
  titulo: string;
  descricao: string;
  encarregado: string;
  empresaId: number;
  empresaNome: string;
  projeto: string;
  categoria: CategoriaAtividade;
  horaInicio: string;
  horaFim: string;
  minutosTrabalhados: number;
  observacao: string;
  criadoEm: string;
  atualizadoEm: string;

  constructor(
    id: number,
    data: string,
    titulo: string,
    descricao: string,
    encarregado: string,
    empresaId: number,
    empresaNome: string,
    projeto: string,
    categoria: CategoriaAtividade,
    horaInicio: string,
    horaFim: string,
    minutosTrabalhados: number,
    observacao: string,
    criadoEm: string,
    atualizadoEm: string
  ) {
    this.id = id;
    this.data = data;
    this.titulo = titulo;
    this.descricao = descricao;
    this.encarregado = encarregado;
    this.empresaId = empresaId;
    this.empresaNome = empresaNome;
    this.projeto = projeto;
    this.categoria = categoria;
    this.horaInicio = horaInicio;
    this.horaFim = horaFim;
    this.minutosTrabalhados = minutosTrabalhados;
    this.observacao = observacao;
    this.criadoEm = criadoEm;
    this.atualizadoEm = atualizadoEm;
  }
}
