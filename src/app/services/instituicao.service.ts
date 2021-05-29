import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Instituicao } from '../models/instituicao.model';

@Injectable({
  providedIn: 'root'
})
export class InstituicaoService {

  private readonly api = `${environment.api_url}/instituicoes`

  constructor(private http: HttpClient) { }

  public listar(): Observable<Instituicao[]>{
    return this.http.get<Instituicao[]>(`${this.api}/listar`);
  }

  public buscarPorEstado(sigla:string){
    return this.http.get<Instituicao[]>(`${this.api}/estado/`+sigla);
  }
}
