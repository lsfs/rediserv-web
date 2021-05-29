import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Instituicao } from '../models/instituicao.model';
import { Unidade } from '../models/unidade.model';

@Injectable({
  providedIn: 'root'
})
export class UnidadeService {

  private readonly api = `${environment.api_url}/unidades`

  constructor(private http: HttpClient) { }

  public listar(): Observable<Unidade[]>{
    return this.http.get<Unidade[]>(`${this.api}/listar`);
  }

  public buscarPorInstituicao(idInstituicao:number){
    return this.http.get<Unidade[]>(`${this.api}/instituicao/`+idInstituicao);
  }
}
