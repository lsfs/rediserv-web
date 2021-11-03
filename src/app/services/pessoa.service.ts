import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AutenticacaoService} from './autenticacao.service';
import {PessoaSaveDto} from '../models/dtos/pessoa-save.dto';
import {Observable} from 'rxjs';
import {MessageResponse} from '../models/jwtPayload/MessageResponse';
import {take} from 'rxjs/operators';
import {PessoaGetDTO} from '../models/dtos/pessoa-get.dto';
import {SenhaDTO} from '../models/dtos/senha-dto';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private readonly api = `${environment.api_url}/pessoas`;

  constructor(private http: HttpClient,
              private autenticacaoService: AutenticacaoService) {
  }

  public buscar(idPessoa: number): Observable<PessoaGetDTO> {
    return this.http.get<PessoaGetDTO>(`${this.api}/${idPessoa}`).pipe(take(1));
  }

  public editar(idPessoa: number, pessoa: PessoaSaveDto): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(`${this.api}/${idPessoa}`, pessoa).pipe(take(1));
  }

  public alterarSenha(idPessoa: number, senhaDTO: SenhaDTO): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(`${this.api}/${idPessoa}/senha`, senhaDTO).pipe(take(1));
  }

  public verificaSenha(idPessoa: number, senhaDTO: SenhaDTO): Observable<MessageResponse>{
    return this.http.post<MessageResponse>(`${this.api}/${idPessoa}/senha`, senhaDTO);
  }

  public excluir(idPessoa: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(`${this.api}/${idPessoa}`, {headers: this.autenticacaoService.getHeader()});
  }

}
