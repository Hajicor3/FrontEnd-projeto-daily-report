import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Atividade } from '../features/atividade/models/atividade.model';
import { CategoriaAtividade } from '../features/atividade/models/categoria-atividade.enum';
import { AtividadeRequest } from '../features/atividade/models/atividade-request.model';
import { Observable } from 'rxjs';
import { FiltroAtividade } from '../features/atividade/models/filtro-atividade';
import { API_BASE_URL } from '../config/api-config';

@Injectable({ providedIn: 'root' })
export class AtividadeService {
  private readonly apiUrl: string = `${API_BASE_URL}/api/atividades`;
  private readonly http = inject(HttpClient);

  buscarAtividades(filtros?: FiltroAtividade): Observable<Atividade[]> {
    let params = new HttpParams();

    if(filtros){
      if(filtros.categoria) params = params.set('categoria', filtros.categoria);
      if(filtros.data) params = params.set('data', filtros.data);
      if(filtros.dataFinal) params = params.set('dataFinal', filtros.dataFinal);
      if(filtros.dataInicial) params = params.set('dataInicial', filtros.dataInicial);
      if(filtros.projeto) params = params.set('projeto', filtros.projeto);
      if(filtros.empresaId) params = params.set('empresaId', filtros.empresaId);
      if(filtros.encarregado) params = params.set('encarregado', filtros.encarregado);
    }
    return this.http.get<Atividade[]>(this.apiUrl, { params });
  }

  criarAtividade(request: AtividadeRequest): Observable<Atividade> {
    return this.http.post<Atividade>(this.apiUrl, request);
  }

  buscarAtividadePorId(id: number): Observable<Atividade> {
    return this.http.get<Atividade>(`${this.apiUrl}/${id}`)
  }

  atualizarAtividade(id: number, request: AtividadeRequest): Observable<Atividade> {
    return this.http.put<Atividade>(`${this.apiUrl}/${id}`, request);
  }

  deletarAtividade(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
