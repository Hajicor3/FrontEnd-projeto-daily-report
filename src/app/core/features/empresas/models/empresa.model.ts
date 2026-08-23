export class EmpresaModel {
  id: number;
  nome: String;
  descricao: String;
  criadoEm: Date;
  atualizadoEm: Date;

  constructor(id: number, nome: String, descricao: String, criadoEm: Date, atualizadoEm: Date){
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.criadoEm = criadoEm;
    this.atualizadoEm = atualizadoEm;
  }
}
