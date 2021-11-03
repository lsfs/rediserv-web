import {Component, OnInit} from '@angular/core';
import {AutenticacaoService} from '../../../services';
import {PropostaService} from '../../../services/proposta.service';
import {PropostaGetDTO} from '../../../models/dtos/proposta-get.dto';
import {UsuarioJwt} from '../../../models/jwtPayload/dadosUsuario';
import {faArrowLeft, faEllipsisV, faTrash, faEdit, faShare} from '@fortawesome/free-solid-svg-icons';
import {ComponentMessageService} from '../../../services/component-message.service';
import {Router} from '@angular/router';
import {PropostaSaveDto} from '../../../models/dtos/proposta-save.dto';

@Component({
  selector: 'app-propostas-rascunhos',
  templateUrl: './propostas-rascunhos.component.html',
  styleUrls: ['./propostas-rascunhos.component.css']
})
export class PropostasRascunhosComponent implements OnInit {

  propostas: PropostaGetDTO[] = [];
  idusuario: number;

  faArrowLeft = faArrowLeft;
  faEllipsisV = faEllipsisV;
  faEdit = faEdit;
  faTrash = faTrash;
  share = faShare;


  haErros = false;
  haSucesso = false;
  mensagemConteudo = '';


  constructor(private autenticacaoService: AutenticacaoService,
              private propostaService: PropostaService,
              private router: Router,
              private messageService: ComponentMessageService) {
  }

  ngOnInit(): void {
    this.enviaNomeMenu();
    this.carregaDadosUsuario();
    this.getPropostasRascunho();
  }

  public carregaDadosUsuario(): void {

    const usuario: UsuarioJwt = this.autenticacaoService.dadosUsuarioJWT();
    this.idusuario = usuario.id;

  }


  public getPropostasRascunho(): void {
    this.propostaService.listar(this.idusuario, 'CRIADA').subscribe(
      propostasRascunho => {
        this.propostas = propostasRascunho;
      }
    );
  }

  toArray(answers: object): any {
    return Object.keys(answers).map(key => answers[key]);
  }


  public apagarRascunho(proposta: PropostaGetDTO): void {

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

  enviaNomeMenu(): void {

    this.messageService.sendMessage('propostas', 'navbar');
  }

  async enviarPropostaEdicao(id: number): Promise<any> {
    this.messageService.sendMessage(id, 'editar-proposta');
    await this.router.navigate(['/home/propostas/nova']);
  }

  submeterProposta(id: number): void {

    const proposta: PropostaSaveDto = {
      dataProposta: '', idAutor: 0, unidades: [],
      situacaoProposta: 'SUBMETIDA'
    };

    this.propostaService.publicar(id, proposta).subscribe(
      () => {
        const propostaFiltrada = this.propostas.filter(
          prop => prop.id == id);

        this.propostas.splice(
          this.propostas.indexOf(propostaFiltrada[0], 0),
          1
        );
      }
    );


    this.getPropostasRascunho();

  }
}
