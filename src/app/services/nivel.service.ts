import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AutenticacaoService} from './autenticacao.service';
import {Observable} from 'rxjs';
import {Nivel} from '../models/nivel.model';

@Injectable({
  providedIn: 'root'
})
export class NivelService {

  private readonly api = `${environment.api_url}/niveis`;

  constructor(private http: HttpClient,
              private autenticacaoService: AutenticacaoService
  ) {

  }

  public listar(): Observable<Nivel[]> {
    return this.http.get<Nivel[]>(`${this.api}`);
  }
}
