import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Instituicao } from '../models/instituicao.model';
import {take} from 'rxjs/operators';
import {InstituicaoSaveDTO} from '../models/dtos/instituicao-save.dto';

@Injectable({
  providedIn: 'root'
})
export class InstituicaoService {

  private readonly api = `${environment.api_url}/instituicoes`;

  constructor(private http: HttpClient) { }

  public listar(): Observable<Instituicao[]>{
    return this.http.get<Instituicao[]>(`${this.api}/listar`);
  }

  public listarPaginada(page: number): Observable<any>{

    return this.http.get<any>(`${this.api}/listarPaginada?size=5&page=` + (page - 1))
      .pipe(
        take(1)
      );

  }

  public criar(instituicaoSave: InstituicaoSaveDTO): Observable<Instituicao> {
    return this.http.post<Instituicao>(`${this.api}`, instituicaoSave)
      .pipe(
        take(1)
      );
  }
  public editar(idinstituicao: number, instituicaoSave: InstituicaoSaveDTO): Observable<Instituicao> {
    return this.http.put<Instituicao>(`${this.api}/${idinstituicao}`, instituicaoSave);
  }

  public excluir(idInstituicao: number): Observable<Instituicao> {
    return this.http.delete<Instituicao>(`${this.api}/${idInstituicao}`);
  }

  public buscarPorEstado(sigla: string): Observable<Instituicao[]>{
    return this.http.get<Instituicao[]>(`${this.api}/estado/` + sigla);
  }

  public buscarPorRegiao(nomeRegiao: string): Observable<Instituicao[]>{
    return this.http.get<Instituicao[]>(`${this.api}/regiao/` + nomeRegiao);
  }

}
