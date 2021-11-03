import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {PropostaSaveDto} from '../models/dtos/proposta-save.dto';
import {Observable} from 'rxjs';
import {PropostaGetDTO} from '../models/dtos/proposta-get.dto';
import {take} from 'rxjs/operators';
import {AutenticacaoService} from './autenticacao.service';
import {CandidatoRequest} from '../models/utils/candidatoRequest.model';


@Injectable({
  providedIn: 'root'
})
export class PropostaService {

  private readonly api = `${environment.api_url}/propostas`;

  constructor(private http: HttpClient,
              private autenticacaoService: AutenticacaoService) {
  }

  public criar(propostaSaveDTO: PropostaSaveDto): Observable<PropostaGetDTO> {
    return this.http.post<PropostaGetDTO>(`${this.api}`, propostaSaveDTO)
      .pipe(
        take(1)
      );
  }

  public editar(idProposta: number, propostaSaveDto: PropostaSaveDto): Observable<PropostaGetDTO> {
    return this.http.put<PropostaGetDTO>(`${this.api}/${idProposta}`, propostaSaveDto)
      .pipe(
        take(1)
      );
  }


  public listarPropostasPublicas(cargo: string, page: number): Observable<any> {
    return this.http.get<any>(`${this.api}/filtro?size=8&page=${page - 1}&cargo${cargo}&situacaoProposta=SUBMETIDA`);
  }


  public listar(idautor: number, status: string): Observable<PropostaGetDTO[]> {
    return this.http.get<PropostaGetDTO[]>
    (`${this.api}?idautor=${idautor}&situacaoProposta=${status}`);
  }


  public listagemFiltrada(idestado: number, cargo: string, idinstituicao: number,
                          situacaoProposta: string, paginaAtual: number): Observable<any> {



    const queryEstado = `&idestado=${idestado}`;
    const queryInstituicao = `&idinstituicao=${idinstituicao.toString().trim()}`;


    return this.http.get<any>
    (`${this.api}/filtro?size=8&page=${paginaAtual - 1}${queryEstado}${queryInstituicao}
    &situacaoProposta=${situacaoProposta}`);
  }

  public candidatar(idproposta: number, idusuario: number): Observable<PropostaGetDTO> {
    return this.http.post<PropostaGetDTO>(`${this.api}/${idproposta}/candidatos/${idusuario}`, {});
  }

  public removerCandidatura(idproposta: number, idusuario: number): Observable<PropostaGetDTO> {
    return this.http.delete<PropostaGetDTO>(`${this.api}/${idproposta}/candidatos/${idusuario}`);

  }


  public buscarProposta(idproposta: number): Observable<PropostaGetDTO> {
    return this.http.get<PropostaGetDTO>(`${this.api}/${idproposta}`);
  }


  public excluir(idproposta: number): Observable<PropostaGetDTO> {
    return this.http.delete<PropostaGetDTO>(`${this.api}/${idproposta}`, {headers: this.autenticacaoService.getHeader()});
  }

  public publicar(idproposta: number, proposta: PropostaSaveDto): Observable<PropostaGetDTO> {
    return this.http.put<PropostaGetDTO>(`${this.api}/${idproposta}/publicar`, proposta).pipe(take(1));
  }

  public buscarPropostasPorCandidato(idcandidato: number): Observable<PropostaGetDTO[]> {
    return this.http.get<PropostaGetDTO[]>
    (`${this.api}/candidato/${idcandidato}`);
  }

}
