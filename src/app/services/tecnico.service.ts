import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AutenticacaoService} from './autenticacao.service';
import {Observable} from 'rxjs';
import {Tecnico} from '../models/tecnico.model';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  private readonly api = `${environment.api_url}/tecnicos`;

  constructor(private http: HttpClient,
              private autenticacaoService: AutenticacaoService
  ) {

  }

  public listar(): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(`${this.api}`);
  }

  public criar(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.post<Tecnico>(`${this.api}`, tecnico,  {headers: this.autenticacaoService.getHeader()})
      .pipe(
        take(1)
      );
  }


  listarPorNivel(idNivel: number): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(`${this.api}/nivel/${idNivel}`);
  }
}
