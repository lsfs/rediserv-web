import  {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Instituicao} from 'src/app/models/instituicao.model';
import {Unidade} from 'src/app/models/unidade.model';
import {InstituicaoService} from 'src/app/services/instituicao.service';
import {UnidadeService} from 'src/app/services/unidade.service';
import {UsuarioJwt} from '../../../models/jwtPayload/dadosUsuario';
import {AutenticacaoService, CargoService} from '../../../services';
import {PropostaSaveDto} from '../../../models/dtos/proposta-save.dto';
import {PropostaService} from '../../../services/proposta.service';
import {take} from 'rxjs/operators';
import {PropostaGetDTO} from '../../../models/dtos/proposta-get.dto';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {Router} from '@angular/router';
import {ComponentMessageService} from '../../../services/component-message.service';
import {UnidadePropostaGetDTO} from '../../../models/dtos/unidade-proposta-get.dto';
import {PessoaGetDTO} from '../../../models/dtos/pessoa-get.dto';
import {PessoaService} from '../../../services/pessoa.service';


@Component({
  selector: 'app-inserir-proposta',
  templateUrl: './inserir-proposta.component.html',
  styleUrls: ['./inserir-proposta.component.css']
})
export class InserirPropostaComponent implements OnInit {

  faArrowLeft = faArrowLeft;

  isLinear = true;
  primeiroPasso: FormGroup;
  segundoPasso: FormGroup;

  filtroEstado = false;
  filtroRegiao = false;
  filtroSelecionado = false;

  lugarSelecionado = '';
  modoEdicao = false;

  instituicoes: Instituicao[] = [];
  unidades: Unidade[] = [];
  destinosProposta: any[] = [];


  idusuario: number;
  nomeUsuario = '';
  cargoUsuario = '';
  instiUsuario = '';
  unidadeUsuario = '';
  mensagem: any;
  idPropostaEmEdicao: number;

  pessoaGetDto: PessoaGetDTO;


  constructor(private formBuilder: FormBuilder,
              private instituicaoService: InstituicaoService,
              private unidadeService: UnidadeService,
              private cargoService: CargoService,
              private autenticacaoService: AutenticacaoService,
              private propostaService: PropostaService,
              private messageService: ComponentMessageService,
              private pessoaService: PessoaService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.enviaNomeMenu();
    this.recebePropostaEdicao();

    this.primeiroPasso = this.formBuilder.group({
      firstCtrl: ['', Validators.required],
      filtro: ['', Validators.required],
      instituicao: ['', Validators.required],
      unidade: ['', Validators.required],
    });

    this.segundoPasso = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  private resetarMapa(): void {
    this.filtroEstado = false;
    this.filtroRegiao = false;
    this.lugarSelecionado = '';

  }

  public selectFiltroOnChange($event: any): void {
    const valor = $event.target.value;
    this.resetarMapa();

    if (valor === 'estado') {
      this.filtroEstado = true;
    } else {
      this.filtroRegiao = true;
    }

    this.filtroSelecionado = true;

  }

  public selecionaLugar(lugar: string): void {
    this.resetaSelectsInstUnidades();
    this.lugarSelecionado = lugar;
  }

  public filtrarInstituicaoPorEstado(sigla: string): void {
    this.instituicaoService.buscarPorEstado(sigla).subscribe(
      (res: Instituicao[]) => {
        this.instituicoes = res;
      });
  }

  public filtrarInstituicaoPorRegiao(nomeRegiao: string): void {
    this.instituicaoService.buscarPorRegiao(nomeRegiao).subscribe(
      (res: Instituicao[]) => {
        this.instituicoes = res;
      }
    );
  }

  public filtrarUnidades($event: any): void {
    const idInstituicao = $event.target.value;

    this.unidadeService.buscarPorInstituicao(idInstituicao).subscribe(
      (res: Unidade[]) => {
        this.unidades = res;
      }
    );

  }

  public resetaSelectsInstUnidades(): void {
    this.primeiroPasso.controls.instituicao.setValue('');
    this.primeiroPasso.controls.unidade.setValue('');
  }

  public adicionaDestinoLista(): void {

    const idInstituicao = this.primeiroPasso.controls.instituicao.value;
    const idUnidade = this.primeiroPasso.controls.unidade.value;

    const instituicao: Instituicao[] = this.instituicoes.filter(instituicao => {
      return instituicao.id == idInstituicao;
    });

    const unidade: Unidade[] = this.unidades.filter((unidade) => {
      return unidade.id == idUnidade;
    });


    const destino = {
      instituicao: instituicao[0],
      unidade: unidade[0],
      idunidade: unidade[0].id
    };

    this.destinosProposta.push(destino);

    this.resetaSelectsInstUnidades();

  }

  public removerDaLista(idProposta: number): void {


    const index = this.destinosProposta[idProposta];

    this.destinosProposta.splice(idProposta, 1);

  }

  public carregaDadosUsuario(): void {

    const usuario: UsuarioJwt = this.autenticacaoService.dadosUsuarioJWT();
    this.idusuario = usuario.id;
    this.nomeUsuario = usuario.nome;



    this.idusuario = this.autenticacaoService.dadosUsuarioJWT().id;


    this.pessoaService.buscar(this.idusuario).subscribe(
      (res: PessoaGetDTO) => {

        this.pessoaGetDto = res;

        this.nomeUsuario = this.pessoaGetDto.nome;

        this.unidadeUsuario = this.pessoaGetDto.unidade.nome;

        this.instiUsuario = this.pessoaGetDto.unidade.instituicao.nome;

        const cargoPessoa = this.pessoaGetDto.cargo.descricao;

        switch (cargoPessoa){
          case 'Professor':
            this.cargoUsuario = cargoPessoa + ' - ' + this.pessoaGetDto.cargo.area;

            break;

          case 'Técnico':
            this.cargoUsuario = cargoPessoa +  ' - ' + this.pessoaGetDto.cargo.funcao;

            break;

        }

      }
    );


  }


  public salvarProposta(situacao: string): void {

    const data: Date = new Date();

    const dataProposta = data.toLocaleDateString();
    const idAutor = this.idusuario;
    const situacaoProposta = situacao;
    const unidades: number[] = this.obterIDsUnidades();

    const proposta: PropostaSaveDto = {
      idAutor,
      unidades,
      dataProposta,
      situacaoProposta
    };

    if (!this.modoEdicao) {
      this.propostaService.criar(proposta).pipe(take(1))
        .subscribe((propostaGetDTO: PropostaGetDTO) => {

          const rota: string = situacaoProposta === 'CRIADA' ? '/home/propostas/rascunhos' : '/home/propostas/submetidas';
          this.router.navigate([rota]);

        });
    } else {
      this.propostaService.editar(this.idPropostaEmEdicao, proposta).pipe(take(1))
        .subscribe((propostaGetDTO: PropostaGetDTO) => {

          const rota: string = situacaoProposta === 'CRIADA' ? '/home/propostas/rascunhos' : '/home/propostas/submetidas';
          this.router.navigate([rota]);

        });
    }


  }

  private obterIDsUnidades(): number[] {

    const unidades: number[] = this.destinosProposta.map(
      destino => {
        return destino.idunidade;

      });

    return unidades;

  }

  enviaNomeMenu(): void {

    this.messageService.sendMessage('propostas', 'navbar');
  }


  private async recebePropostaEdicao(): Promise<any> {
    this.mensagem = this.messageService.getMessage('editar-proposta');

    if (this.mensagem) {
      this.messageService.clearMessages('editar-proposta');
      this.modoEdicao = true;
      await this.buscarProposta(this.mensagem);
    }


  }

  private montaDadosEdicao(proposta: PropostaGetDTO): void {

    this.filtroEstado = true;

    const destinos: UnidadePropostaGetDTO[] = proposta.unidadePropostaGetDTOS;


    destinos.forEach((destino) => {

      const instiDestino = {
        nome: destino.instituicao
      };

      const unidadeDestino = {
        id: destino.id,
        nome: destino.nome
      };

      const dest = {
        instituicao: instiDestino,
        unidade: unidadeDestino,
        idunidade: unidadeDestino.id
      };

      this.destinosProposta.push(dest);
    });

    this.idPropostaEmEdicao = proposta.id;

  }


  private buscarProposta(idproposta: number): void {
    this.propostaService.buscarProposta(idproposta).subscribe(
      res => {
        this.montaDadosEdicao(res);
      }
    );
  }

}
