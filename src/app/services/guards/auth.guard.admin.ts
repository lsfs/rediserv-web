import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AutenticacaoService} from '../autenticacao.service';
import {UsuarioJwt} from '../../models/jwtPayload/dadosUsuario';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdmin implements CanActivate {

  constructor(private router: Router,
              private autenticacaoService: AutenticacaoService) {
  }

  /**
   * Método responsável por verificar se o usuário que realizou a alteração de rota está autenticado
   * @param route
   * @param state
   */
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>{

    const isAutenticado = await this.autenticacaoService.isAutenticado();

    if (!isAutenticado) {

      this.router.navigate(['']);
      return false;
    }

    const usuarioLogado: UsuarioJwt = this.autenticacaoService.dadosUsuarioJWT();
    const permissao = usuarioLogado.authorities[0];

    console.log(permissao);

    if (permissao !== 'ROLE_ADMIN') {
      this.router.navigate(['nao-autorizado']);
      return false;
    }

    return true;

  }

}
