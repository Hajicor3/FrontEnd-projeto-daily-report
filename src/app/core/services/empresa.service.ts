import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpresaModel } from '../features/empresas/models/empresa.model';
import { EmpresaRequest } from '../features/empresas/models/empresa-request.model';
import { API_BASE_URL } from '../config/api-config';


@Injectable({ providedIn: 'root' })
export class EmpresaService {
  private readonly apiUrl = `${API_BASE_URL}/api/empresas`;
  private readonly http = inject(HttpClient);

  buscarEmpresas(): Observable<EmpresaModel[]> {
    return this.http.get<EmpresaModel[]>(this.apiUrl);
  }

  buscarEmpresaPorId(id: number): Observable<EmpresaModel> {
    return this.http.get<EmpresaModel>(`${this.apiUrl}/${id}`);
  }

  criarEmpresa(request: EmpresaRequest): Observable<EmpresaModel> {
    return this.http.post<EmpresaModel>(this.apiUrl, request);
  }

  atualizarEmpresa(id: number, request: EmpresaRequest): Observable<EmpresaModel>  {
    return this.http.put<EmpresaModel>(`${this.apiUrl}/${id}`, request);
  }

  deletarEmpresa(id: number): Observable<void>  {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
