import { CategoriaAtividade } from "./categoria-atividade.enum";

export class Atividade {
  id: number;
  data: Date;
  titulo: string;
  descricao: string;
  empresaId: number;
  empresaNome: string;
  projeto: string;
  categoriaAtividade: CategoriaAtividade;
  horaInicio: Date;
  horaFim: Date
  minutosTrabalhados: number;
  observacao: string;
  criadoEm: Date;
  atualizadoEm: Date;

  constructor(
    id: number,
    data: Date,
    titulo: string,
    descricao: string,
    empresaId: number,
    empresaNome: string,
    projeto: string,
    categoriaAtividade: CategoriaAtividade,
    horaInicio: Date,
    horaFim: Date,
    minutosTrabalhados: number,
    observacao: string,
    criadoEm: Date,
    atualizadoEm: Date
  ) {
    this.id = id;
    this.data = data;
    this.titulo = titulo;
    this.descricao = descricao;
    this.empresaId = empresaId;
    this.empresaNome = empresaNome;
    this.projeto = projeto;
    this.categoriaAtividade = categoriaAtividade;
    this.horaInicio = horaInicio;
    this.horaFim = horaFim;
    this.minutosTrabalhados = minutosTrabalhados;
    this.observacao = observacao;
    this.criadoEm = criadoEm;
    this.atualizadoEm = atualizadoEm;
  }
}
