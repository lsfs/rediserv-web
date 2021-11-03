import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Estado} from '../models/estado.model';
import {Cidade} from "../models/cidade.model";
import {take} from "rxjs/operators";
import {CidadeSaveDTO} from "../models/dtos/cidade-save.dto";

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  private readonly api = `${environment.api_url}/cidades`;

  constructor(private http: HttpClient) { }

  public listar(): Observable<Cidade[]>{
    return this.http.get<Cidade[]>(`${this.api}/listar`);
  }

  public listarPaginada(page: number): Observable<any>{

    return this.http.get<any>(`${this.api}/listarPaginada?size=5&page=` + (page - 1))
      .pipe(
        // tap(console.log),
        take(1)
      );

  }

  public buscarPorEstado(idestado: number): Observable<Cidade[]>{
     return this.http.get<Cidade[]>(`${this.api}/estado/${idestado}`);
  }

  public criar(cidadeSave: CidadeSaveDTO): Observable<Cidade> {
    return this.http.post<Cidade>(`${this.api}`, cidadeSave)
      .pipe(
        // tap(console.log),
        take(1)
      );
  }

  public editar(idcidade: number, cidadeSave: CidadeSaveDTO): Observable<Cidade> {
    return this.http.put<Cidade>(`${this.api}/${idcidade}`, cidadeSave);
  }

  public excluir(idcidade: number): Observable<Cidade> {
    return this.http.delete<Cidade>(`${this.api}/${idcidade}`);
  }


}
