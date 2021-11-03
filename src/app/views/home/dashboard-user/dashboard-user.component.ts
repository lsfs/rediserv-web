import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AutenticacaoService, JWT_DATA} from '../../../services/autenticacao.service';
import {UsuarioJwt} from '../../../models/jwtPayload/dadosUsuario';
import {PropostaGetDTO} from '../../../models/dtos/proposta-get.dto';
import {PropostaService} from '../../../services/proposta.service';
import {faPlus, faSearch} from '@fortawesome/free-solid-svg-icons';
import {MatDialog} from '@angular/material/dialog';

import {ComponentMessageService} from '../../../services/component-message.service';
import {Mensagem} from '../../../models/component-message.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService, ModalDirective} from 'ngx-bootstrap/modal';

export const OPT_USUARIO = 'opt_usuario';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {


  faPlus = faPlus;
  faSearch = faSearch;
  ultimaPropostaSubmetida: PropostaGetDTO;
  ultimaPropostaCriada: PropostaGetDTO;
  ultimaPropostaCandidatada: PropostaGetDTO;
  numeroCandidatos: number;


  idusuario: number;
  nomeUsuario = '';
  cargoUsuario = '';
  instiUsuario = '';
  unidadeUsuario = '';


  @ViewChild('boasvindas') boasvindas: TemplateRef<any>;


  constructor(private autenticacaoService: AutenticacaoService,
              private propostaService: PropostaService,
              public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.carregaDadosUsuario();
    this.buscarPropostasUsuarioSubmetidas();
    this.buscarPropostasUsuarioCriadas();
    this.buscarPropostasCandidatadas();

  }




  public async buscarPropostasUsuarioCriadas(): Promise<any> {

    await this.propostaService.listar(this.idusuario, 'CRIADA').subscribe(
      (res: any) => {
        this.ultimaPropostaCriada = res[0];
      }
    );

  }

  public buscarPropostasUsuarioSubmetidas(): void {

    this.propostaService.listar(this.idusuario, 'SUBMETIDA').subscribe(
      (res: any) => {

        this.ultimaPropostaSubmetida = res[0];

      }
    );

  }


  private buscarPropostasCandidatadas(): void {
    this.propostaService.buscarPropostasPorCandidato(this.idusuario).subscribe(
      (res: any) => {

        this.ultimaPropostaCandidatada = res[0];

      }
    );
  }

  public carregaDadosUsuario(): void {

    const usuario: UsuarioJwt = this.autenticacaoService.dadosUsuarioJWT();
    this.idusuario = usuario.id;

    this.nomeUsuario = usuario.nome;


  }

  toArray(unidades: object): any {
    return Object.keys(unidades).map(key => unidades[key]);
  }


}
