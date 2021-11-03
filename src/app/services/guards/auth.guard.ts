import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AutenticacaoService} from '../autenticacao.service';
import {DashboardUserComponent} from '../../views/home';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private autenticacaoService: AutenticacaoService) {
  }

  /**
   * Método responsável por verificar se o usuário que realizou a alteração de rota está autenticado
   * @param route
   * @param state
   */
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    const isAutenticado = await this.autenticacaoService.isAutenticado();


    if (!isAutenticado) {
      this.router.navigate(['']);
      return false;
    }
    this.openTospopup();

    return true;
  }

  openTospopup(): void{
    console.log('isShow: ', localStorage.opt_usuario);

    if (localStorage.opt_usuario == undefined){
      localStorage.opt_usuario = true;

    }
  }

}
