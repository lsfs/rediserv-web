import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Unidade } from '../models/unidade.model';
import {take} from 'rxjs/operators';
import {UnidadeSaveDto} from '../models/dtos/unidade-save.dto';

@Injectable({
  providedIn: 'root'
})
export class UnidadeService {

  private readonly api = `${environment.api_url}/unidades`;

  constructor(private http: HttpClient) { }

  public listar(): Observable<Unidade[]>{
    return this.http.get<Unidade[]>(`${this.api}/listar`);
  }

  public buscar(idunidade: number): Observable<Unidade>{
    return this.http.get<Unidade>(`${this.api}/${idunidade}`);
  }

  public buscarPorInstituicao(idInstituicao: number): Observable<Unidade[]>{
    return this.http.get<Unidade[]>(`${this.api}/instituicao/` + idInstituicao);
  }

  public listarPaginada(page: number): Observable<any>{

    return this.http.get<any>(`${this.api}/listarPaginada?size=5&page=` + (page - 1))
      .pipe(
        take(1)
      );

  }

  public criar(unidadeSave: UnidadeSaveDto): Observable<Unidade> {
    return this.http.post<Unidade>(`${this.api}`, unidadeSave)
      .pipe(
        take(1)
      );
  }

  public editar(idunidade: number, unidadeSave: UnidadeSaveDto): Observable<Unidade> {
    return this.http.put<Unidade>(`${this.api}/${idunidade}`, unidadeSave);
  }

  public excluir(idunidade: number): Observable<Unidade> {
    return this.http.delete<Unidade>(`${this.api}/${idunidade}`);
  }



}
