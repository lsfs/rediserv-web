import {Component, OnInit, TemplateRef} from '@angular/core';
import {PropostaGetDTO} from '../../../models/dtos/proposta-get.dto';
import {AutenticacaoService} from '../../../services';
import {PropostaService} from '../../../services/proposta.service';
import {Router} from '@angular/router';
import {ComponentMessageService} from '../../../services/component-message.service';
import {UsuarioJwt} from '../../../models/jwtPayload/dadosUsuario';
import {faArrowLeft, faUser, faMapMarker, faTrash, faEnvelope, faEye} from '@fortawesome/free-solid-svg-icons';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {PessoaDto} from '../../../models/dtos/pessoa-dto';


@Component({
  selector: 'app-propostas-submetidas',
  templateUrl: './propostas-submetidas.component.html',
  styleUrls: ['./propostas-submetidas.component.css']
})
export class PropostasSubmetidasComponent implements OnInit {

  modalRef: BsModalRef;

  propostas: PropostaGetDTO[] = [];
  idusuario: number;

  faArrowLeft = faArrowLeft;
  faTrash = faTrash;
  info = faEye;
  mapMarker = faMapMarker;
  user = faUser;
  envelope = faEnvelope;



  haErros = false;
  haSucesso = false;
  mensagemConteudo = '';
  private candidatos: PessoaDto[];
  cargoCandidato = '';


  constructor(private autenticacaoService: AutenticacaoService,
              private propostaService: PropostaService,
              private router: Router,
              private messageService: ComponentMessageService,
              private modalService: BsModalService,
  ) { }

  ngOnInit(): void {

    this.carregaDadosUsuario();
    this.getPropostasSubmetidas();
  }

  public carregaDadosUsuario(): void {

    const usuario: UsuarioJwt = this.autenticacaoService.dadosUsuarioJWT();
    this.idusuario = usuario.id;

  }


  public getPropostasSubmetidas(): void {
    this.propostaService.listar(this.idusuario, 'SUBMETIDA').subscribe(
      propostasSubmetidas => {
        this.propostas = propostasSubmetidas;

      }
    );
  }


  toArray(answers: object): any {
    return Object.keys(answers).map(key => answers[key]);
  }


  public apagarSubmetida(proposta: PropostaGetDTO): void {

    const idproposta = proposta.id;

    this.propostaService.excluir(idproposta)
      .subscribe(() => {

        this.haSucesso = true;
        this.mensagemConteudo = 'Proposta excluída com sucesso';

        this.propostas.splice(
          this.propostas.indexOf(proposta, 0), 1);

      }, error => {

        this.haErros = true;
        this.mensagemConteudo = 'Falha ao excluír registro';
      });

  }


  async enviarPropostaEdicao(id: number): Promise<any> {
    this.messageService.sendMessage(id, 'editar-proposta');
    await this.router.navigate(['/home/propostas/nova']);
  }


  public exibeDetalhes(proposta: PropostaGetDTO, template: TemplateRef<any>): void {



    this.candidatos = proposta.candidatos;
    console.log(proposta);
    console.log(proposta.candidatos);

    this.abrirModal(template);

  }

  private abrirModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }



}
