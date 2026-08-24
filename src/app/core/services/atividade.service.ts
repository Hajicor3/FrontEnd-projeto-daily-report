import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Atividade } from '../features/atividade/models/atividade.model';
import { CategoriaAtividade } from '../features/atividade/models/categoria-atividade.enum';
import { AtividadeRequest } from '../features/atividade/models/atividade-request.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AtividadeService {
  private readonly apiUrl: string = 'http://localhost:8080/api/atividades';
  private readonly http = inject(HttpClient);

  buscarAtividades(): Observable<Atividade[]> {
    return this.http.get<Atividade[]>(this.apiUrl);
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
}
