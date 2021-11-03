import { Component, OnInit } from '@angular/core';
import {AutenticacaoService} from '../../../services/autenticacao.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  nomeUsuario: string;
  constructor(
    private autenticacaoService: AutenticacaoService
  ) { }

  ngOnInit(): void {
    this.obtemDadosUsuario();
  }

  private obtemDadosUsuario(): void {
    this.nomeUsuario = this.autenticacaoService.nomeUsuario;
  }

}
