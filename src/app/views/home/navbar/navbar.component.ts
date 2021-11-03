import {Component, OnInit} from '@angular/core';
import {AutenticacaoService} from '../../../services/autenticacao.service';
import {Router} from '@angular/router';
import {Subscription} from "rxjs";
import {ComponentMessageService} from "../../../services/component-message.service";
import {Mensagem} from "../../../models/component-message.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  mensagem: any;
  subscription: Subscription;

  menuAtivo = '';

  constructor(private autenticacaoService: AutenticacaoService,
              private messageService: ComponentMessageService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.mensagem = this.messageService.getMessage('navbar');
    this.messageService.clearMessages('navbar');
    this.alteraMenu();
  }

  async logout(): Promise<any> {
    this.autenticacaoService.logout();
    await this.router.navigate(['']);

  }


  private alteraMenu(): void {
    this.menuAtivo = this.mensagem;
}


}
