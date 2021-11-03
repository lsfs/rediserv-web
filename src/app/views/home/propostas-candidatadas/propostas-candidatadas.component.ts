import {Component, OnInit} from '@angular/core';
import {
  faArrowLeft,
  faBan,
  faCalendarAlt,
  faEnvelope,
  faEye,
  faMapMarker,
  faPlane,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import {AutenticacaoService} from '../../../services';
import {PropostaService} from '../../../services/proposta.service';
import {Router} from '@angular/router';
import {ComponentMessageService} from '../../../services/component-message.service';
import {UsuarioJwt} from '../../../models/jwtPayload/dadosUsuario';
import {PropostaGetDTO} from '../../../models/dtos/proposta-get.dto';

@Component({
  selector: 'app-propostas-candidatadas',
  templateUrl: './propostas-candidatadas.component.html',
  styleUrls: ['./propostas-candidatadas.component.css']
})
export class PropostasCandidatadasComponent implements OnInit {


  faArrowLeft = faArrowLeft;
  faBan = faBan;
  info = faEye;
  mapMarker = faMapMarker;
  user = faUser;
  envelope = faEnvelope;
  plane = faPlane;
  calendar = faCalendarAlt;


  propostas: PropostaGetDTO[] = [];

  idusuario: number;

  constructor(
    private autenticacaoService: AutenticacaoService,
    private propostaService: PropostaService,
    private router: Router,
    private messageService: ComponentMessageService
  ) {
  }


  ngOnInit(): void {
    this.enviaNomeMenu();
    this.carregaDadosUsuario();
    this.buscaPropostasCandidatadas();

  }

  enviaNomeMenu(): void {

    this.messageService.sendMessage('propostas', 'navbar');
  }

  public carregaDadosUsuario(): void {

    const usuario: UsuarioJwt = this.autenticacaoService.dadosUsuarioJWT();
    this.idusuario = usuario.id;

  }

  public buscaPropostasCandidatadas(): void {

    this.propostaService.buscarPropostasPorCandidato(this.idusuario).subscribe(
      propostas => {
        this.propostas = propostas;
      }
    );
  }


  toArray(answers: object): any {
    return Object.keys(answers).map(key => answers[key]);
  }

  public removerCandidatura(proposta: PropostaGetDTO): void {

    const idproposta = proposta.id;

    this.propostaService.removerCandidatura(idproposta, this.idusuario).subscribe(
      () => {
        this.propostas.splice(
          this.propostas.indexOf(proposta, 0), 1);

      }
    );
  }
}
