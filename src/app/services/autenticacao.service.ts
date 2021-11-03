import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {take} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import {Observable} from 'rxjs';
import {LoginRequest} from '../models/jwtPayload/LoginRequest';
import {JwtResponse} from '../models/jwtPayload/JwtResponse';
import {UsuarioJwt} from '../models/jwtPayload/dadosUsuario';
import {CadastroRequest} from '../models/jwtPayload/cadastroRequest';
import {MessageResponse} from '../models/jwtPayload/MessageResponse';
import {UsuarioSenhaReset} from '../models/utils/usuarioSenhaReset.model';
import {NovaSenhaRequest} from '../models/utils/novaSenhaRequest.model';

export const JWT_DATA = 'jwt_data';
export const DATA_EXP = 'data_exp';

@Injectable({providedIn: 'root'})
export class AutenticacaoService {

  private readonly secondsInTimestampToExpire = 86400;

  private readonly api = `${environment.api_url}/auth`;


  constructor(private http: HttpClient) {
  }

  /**
   * Método responsável por autenticar um usuário baseado no login e senha.
   * <br>URI: /autenticacao/keycloak/login
   *
   * @param login login do usuário que será autenticado
   * @param pass senha do usuário que será autenticada
   */
  public autenticar(login: string, pass: string): Observable<JwtResponse> {

    const loginRequest: LoginRequest = {
      email: login,
      senha: pass,
    };

    this.setDataExpToken();
    return this.http
      .post<JwtResponse>(`${this.api}/login`, loginRequest)
      .pipe(take(1));

  }


  /**
   * Método responsável por atualizar o token utilizado para autenticar o usuário
   * <br>URI: /autenticacao/keycloak/refresh
   *
   * @param refresh string de refresh extraída do token jwt
   */
  // public async refreshToken(refresh: string): Promise<boolean> {
  //   const refreshTK = {
  //     refreshToken: refresh
  //   };
  //
  //   try {
  //     const response = await this.http
  //       .post<AuthResponse>(`${environment.api_autenticacao}/keycloak/refresh`, refreshTK)
  //       .pipe(take(1))
  //       .toPromise();
  //     this.setToken(JSON.stringify(response));
  //     this.setDataExpToken();
  //
  //     return true;
  //   } catch (e) {
  //   }
  //   return false;
  // }

  /**
   * Método responsável por armazenar o token de autenticação no localstorage do browser
   * @param data string que será armazenada no localstorage
   */
    public setToken(data: string): void {
    localStorage.setItem(JWT_DATA, data);
  }

  /**
   * Método responsável por decodificar o token de acesso aplicando a função jwt_decode<>()
   * na string armazenada no localstorage
   */
  public decodeToken(): any {
    const auth = this.authenticationData;
    const decoded = jwt_decode<any>(auth.accessToken);
    return decoded;
  }

  /**
   * Método responsável por verificar se existe um usuário logado
   */
  public isLoggedIn(): boolean {
    return this.authenticationData !== null;
  }

  /**
   * Realiza o logout do usuário removendo o token jwt do localstorage
   */
  public logout(): void {
    return localStorage.removeItem(JWT_DATA);
  }

  /**
   * Método responsável por gerar o header de autenticação para as requisições realizadas pela aplicação
   */
  public getHeader(): any {
    const token = this.authenticationData;
    const headers = {Authorization: `Bearer ${token.accessToken}`};
    return headers;
  }

  /**
   * Método responsável por extrair o token jwt do localstorage no formato {@link any}
   */
  public get authenticationData(): any {
    return JSON.parse(localStorage.getItem(JWT_DATA));
  }

  /**
   * Método responsável por converter o assunto do token decodificado em um objeto UsuarioJwt
   */
  public dadosUsuarioJWT(): UsuarioJwt {
    const user: UsuarioJwt = JSON.parse(this.decodeToken().sub);
    return user;
  }


  /**
   * Método responsável por extrair o nome do usuário logado do token decodificado
   */
  public get nomeUsuario(): string {
    const nome = this.dadosUsuarioJWT().nome;
    return nome;
  }

  /**
   * Método responsável por extrair o email do usuário logado do token decodificado
   */
  public get emailUsuario(): string {
    const email = this.dadosUsuarioJWT().email;
    return email;
  }


  /**
   * Método responsável por extrair o token de acesso do token jwt
   */
  public get accessToken(): string {
    if (this.authenticationData != null) {
      return this.authenticationData.accessToken;
    }

  }

  /**
   * Método responsável por extrair as permissões que o usuário possui
   */
  public get permissaoUsuario(): string {
    const role = this.dadosUsuarioJWT().authorities[0];
    return role;
  }

  /**
   * Método responsável por extrair a data de validade do token jwt no formato timestamp
   */
  public get dataValidadeToken(): Date {
    const dataExpStr = +localStorage.getItem(DATA_EXP);

    const dataExp = new Date(dataExpStr);
    return dataExp;
  }

  /**
   * Método responsável por checar se o token jwt ainda é válido
   */
  public checaTokenValido(): boolean {
    const dataAtual = new Date();
    return this.dataValidadeToken.valueOf() > dataAtual.valueOf();
  }

  /**
   * Método responsável por checar se o usuário foi autenticado
   */
  public async isAutenticado(): Promise<boolean> {

    const accessToken = this.accessToken;

    if (accessToken != null) {
      const isTokenValido = this.checaTokenValido();
      if (isTokenValido) {
        return true;
      }

      // const refreshToken = this.authenticationData.refresh_token;
      //
      // if (await this.refreshToken(refreshToken)) {
      //   return true;
      // }
    }
    return false;
  }

  /**
   * Método responsável por salvar na localstorage do browser a data de vencimento do token no formato de timestamp
   * @private
   */
  private setDataExpToken(): void {
    const data = new Date();
    data.setSeconds(data.getSeconds() + this.secondsInTimestampToExpire);
    localStorage.setItem(DATA_EXP, data.getTime().toString());
  }

  public cadastraUsuario(cadastroRequest: CadastroRequest): Observable<any>{

    return this.http.post<any>(`${this.api}/registro`, cadastroRequest);


  }

  public confirmarEmail(token: string): Observable<MessageResponse>{
    return this.http.get<MessageResponse>(`${this.api}/validacaoEmail?token=${token}`);
  }

  public solicitaNovaSenha(usuarioSenhaReset: UsuarioSenhaReset): Observable<MessageResponse>{
    return this.http.post<MessageResponse>(`${this.api}/resetaSenha`, usuarioSenhaReset);
  }

  public enviaNovaSenha(senhaNovaRequest: NovaSenhaRequest, token: string): Observable<MessageResponse>{
    return this.http.post<MessageResponse>(`${this.api}/novaSenha?token=` + token, senhaNovaRequest);
  }

}

