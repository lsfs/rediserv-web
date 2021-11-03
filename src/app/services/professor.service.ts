import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AutenticacaoService} from './autenticacao.service';
import {Observable} from 'rxjs';
import {Professor} from '../models/professor.model';
import {UnidadeSaveDto} from "../models/dtos/unidade-save.dto";
import {Unidade} from "../models/unidade.model";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  private readonly api = `${environment.api_url}/professores`;


  constructor(private http: HttpClient,
              private autenticacaoService: AutenticacaoService
  ) {

  }

  public listar(): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${this.api}`);
  }


  public criar(professor: Professor): Observable<Professor> {
    return this.http.post<Professor>(`${this.api}`, professor)
      .pipe(
        take(1)
      );
  }


}
