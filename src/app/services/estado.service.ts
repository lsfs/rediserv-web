import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estado } from '../models/estado.model';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private readonly api = `${environment.api_url}/estados`;

  constructor(private http: HttpClient) { }

  public listar(): Observable<Estado[]>{
    return this.http.get<Estado[]>(`${this.api}/listar`);
  }

  public listarPaginada(page: number): Observable<any>{

    return this.http.get<any>(`${this.api}/listarPaginada?size=5&page=` + (page - 1))
      .pipe(
        take(1)
      );

  }


  public criar(estado: Estado): Observable<Estado> {
    return this.http.post<Estado>(`${this.api}`, estado)
      .pipe(
        take(1)
      );
  }

  public editar(idestado: number, estado: Estado): Observable<Estado> {
    return this.http.put<Estado>(`${this.api}/${idestado}`, estado);
  }

  public excluir(idestado: number): Observable<Estado> {
    return this.http.delete<Estado>(`${this.api}/${idestado}`);
  }

}
