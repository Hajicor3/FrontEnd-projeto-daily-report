export class EmpresaModel {
  id: number;
  nome: String;
  descricao: String;
  criadoEm: string;
  atualizadoEm: string;

  constructor(id: number, nome: String, descricao: String, criadoEm: string, atualizadoEm: string){
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.criadoEm = criadoEm;
    this.atualizadoEm = atualizadoEm;
  }
}
