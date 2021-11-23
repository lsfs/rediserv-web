import {AfterViewChecked, Component, OnInit, TemplateRef} from '@angular/core';
import {AutenticacaoService, CargoService, EstadoService, InstituicaoService} from '../../../services';
import {PropostaService} from '../../../services/proposta.service';
import {PropostaGetDTO} from '../../../models/dtos/proposta-get.dto';
import {UsuarioJwt} from '../../../models/jwtPayload/dadosUsuario';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {
  faInfoCircle, faCheck, faAngleLeft, faUser, faArrowRight, faMapMarker
  , faCalendarAlt, faPlane, faFilter
} from '@fortawesome/free-solid-svg-icons';
import {ComponentMessageService} from '../../../services/component-message.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Estado} from '../../../models/estado.model';
import {Instituicao} from '../../../models/instituicao.model';
import {Cargo} from '../../../models/cargo.model';
import {CandidatoRequest} from '../../../models/utils/candidatoRequest.model';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {PessoaGetDTO} from "../../../models/dtos/pessoa-get.dto";
import {PessoaService} from "../../../services/pessoa.service";


export interface User {
  name: string;
}


@Component({
  selector: 'app-visao-propostas',
  templateUrl: './visao-propostas.component.html',
  styleUrls: ['./visao-propostas.component.css']
})
export class VisaoPropostasComponent implements OnInit {

  modalRef: BsModalRef;

  info = faInfoCircle;
  check = faCheck;
  back = faAngleLeft;
  seta = faArrowRight;
  usuario = faUser;
  mapMarker = faMapMarker;
  calendar = faCalendarAlt;
  plane = faPlane;
  filter = faFilter;


  modeloListagem = 1;


  formFiltro: FormGroup;

  propostas: PropostaGetDTO[] = [];
  propostasCandidatadas: PropostaGetDTO[] = [];
  estados: Estado[] = [];
  instituicoes: Instituicao[] = [];
  cargos: Cargo[] = [];
  propostaDetalhada: PropostaGetDTO;
  usuarioJwt: UsuarioJwt;

  idusuario: number;


  paginaAtual = 1;
  paginas: Array<number>;
  totalRegistros: number;


  notFound = 'Não encontrado';


  estadoControl = new FormControl();
  instituicaoControl = new FormControl();


  estadosFiltrados: Observable<Estado[]>;
  instituicoesFiltradas: Observable<Instituicao[]>;

  pessoaGetDto: PessoaGetDTO;
  cargoPessoa: string;
  msgFiltroInstituicao: string;
  filtroAplicado: boolean = false;

  listaVazia: boolean = false;


  constructor(private autenticacaoService: AutenticacaoService,
              private modalService: BsModalService,
              private propostaService: PropostaService,
              private estadoService: EstadoService,
              private instituicaoService: InstituicaoService,
              private cargoService: CargoService,
              private pessoaService: PessoaService,
              private formBuilder: FormBuilder) {
  }


  ngOnInit(): void {


    this.carregaDadosUsuario();
    this.getEstados();
    this.getInstituicoes();
    this.buscaPropostasCandidatadas();


    console.log(this.cargoPessoa);

    this.msgFiltroInstituicao = 'Selecione um estado antes';

    this.formFiltro = this.formBuilder.group({
      filtroInstituicao: this.formBuilder.control(['', Validators.required]),
      filtroEstado: this.formBuilder.control(['', Validators.required]),
    });

    this.estadosFiltrados = this.estadoControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nome),
        map(nome => nome ? this._filterEstado(nome) : this.estados.slice())
      );

    this.instituicoesFiltradas = this.instituicaoControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nome),
        map(nome => nome ? this._filterInstituicao(nome) : this.instituicoes.slice())
      );


  }


  displayFnEstado(estado: Estado): string {
    return estado && estado.nome ? estado.nome : '';
  }

  displayFnInstituicao(instituicao: Instituicao): string {
    return instituicao && instituicao.nome ? instituicao.nome : '';
  }


  _filterEstado(nome: string): Estado[] {
    const filterValue = nome.toLowerCase();

    return this.estados.filter(estado => estado.nome.toLowerCase().includes(filterValue));
  }

  _filterInstituicao(nome: string): Instituicao[] {
    const filterValue = nome.toLowerCase();

    return this.instituicoes.filter(instituicao => instituicao.nome.toLowerCase().includes(filterValue));
  }



  public getPropostasPaginadas(cargo: string, paginaAtual: number): void {
    this.propostaService.listarPropostasPublicas(cargo, paginaAtual).subscribe(
      propostasPaginadas => {
        this.propostas = propostasPaginadas.content;
        this.paginas = new Array(propostasPaginadas.totalPages);
        this.totalRegistros = propostasPaginadas.totalElements;

        if (this.totalRegistros === 0 ){
          this.listaVazia = true;
        }


      }
    );
  }

  public montaBuscaFiltro(paginaAtual: number): void {


    const idEstado = this.estadoControl.value ? this.estadoControl.value.id : '';

    const idInstituicao = this.instituicaoControl.value ? this.instituicaoControl.value.id : '';


    console.log(idInstituicao);




    this.paginaAtual = paginaAtual;
    this.modeloListagem = 2;


    this.filtrarPropostas(idEstado, this.cargoPessoa, idInstituicao, 'SUBMETIDA', this.paginaAtual);

  }

  public filtrarPropostas(idestado: number, cargo: string, idinstituicao: number,
                          situacaoProposta: string, paginaAtual: number): void {

    this.propostaService.listagemFiltrada(idestado, cargo, idinstituicao, situacaoProposta, paginaAtual).subscribe(
      propostasFiltradas => {
        this.propostas = propostasFiltradas.content;
        this.paginas = new Array(propostasFiltradas.totalPages);
        this.totalRegistros = propostasFiltradas.totalElements;
        this.filtroAplicado = true;

        if (this.totalRegistros === 0 ){
          this.listaVazia = true;
        }

      }
    );
  }


  public carregaDadosUsuario(): void {

    const usuario: UsuarioJwt = this.autenticacaoService.dadosUsuarioJWT();
    this.idusuario = usuario.id;

    this.pessoaService.buscar(this.idusuario).subscribe(
      (res: PessoaGetDTO) => {

        this.pessoaGetDto = res;
        this.cargoPessoa = this.pessoaGetDto.cargo.descricao;

        this.getPropostasPaginadas(this.cargoPessoa, this.paginaAtual);


      }
    );


  }


  public async pageChanged(event): Promise<any> {
    this.paginaAtual = event;
    await this.trocaPagina(this.paginaAtual);
  }

  protected async trocaPagina(i): Promise<any> {
    this.paginaAtual = i;

    switch (this.modeloListagem) {
      case 1:
        this.getPropostasPaginadas(this.cargoPessoa, this.paginaAtual);
        break;
      case 2:
        this.montaBuscaFiltro(this.paginaAtual);
        break;
    }


  }

  public getEstados(): void {
    this.estadoService.listar().subscribe(
      res => {
        this.estados = res;
        this.estadosFiltrados = this.estadoControl.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.nome),
            map(nome => nome ? this._filterEstado(nome) : this.estados.slice())
          );
      }
    );

  }

  public getInstituicoes(): void {
    this.instituicaoService.listar().subscribe(
      res => {
        this.instituicoes = res;
      }
    );
  }


  toArray(answers: object): any {
    return Object.keys(answers).map(key => answers[key]);
  }


  public exibeDetalhes(proposta: PropostaGetDTO, template: TemplateRef<any>): void {

    this.propostaDetalhada = proposta;
    this.abrirModal(template);

  }


  /**
   *  Método para exibição do modal com os detalhes da proposta
   *
   * @param template template a ser aberto
   *
   * @return vazio
   */
  private abrirModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }


  public selectEstadoOnChange($event: any): void {

    if ($event.option.value === '') {
      return;
    }

    const idEstado: number = $event.option.value.id;


    const estadoFiltrado: Estado[] = this.estados.filter(
      estado => estado.id == idEstado
    );

    const siglaEstado = estadoFiltrado[0].sigla;

    this.filtrarInstituicoesEstado(siglaEstado);

    this.msgFiltroInstituicao = 'Digite para filtrar';

  }

  public filtrarInstituicoesEstado(siglaEastado: string): void {
    this.instituicaoService.buscarPorEstado(siglaEastado).subscribe(
      res => {
        this.instituicoes = res;
        this.instituicoesFiltradas = this.instituicaoControl.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.nome),
            map(nome => nome ? this._filterInstituicao(nome) : this.instituicoes.slice())
          );
      }
    );
  }



  public candidatar(idproposta: number): void {

    const usuario: UsuarioJwt = this.autenticacaoService.dadosUsuarioJWT();
    const idusuario = usuario.id;


    this.propostaService.candidatar(idproposta, idusuario).subscribe(
      res => {
        this.fecharModal();
        this.getPropostasPaginadas(this.cargoPessoa, this.paginaAtual);
        this.buscaPropostasCandidatadas();
      }
    );


  }


  public buscaPropostasCandidatadas(): void {

    this.propostaService.buscarPropostasPorCandidato(this.idusuario).subscribe(
      propostas => {
        this.propostasCandidatadas = propostas;
      }
    );
  }

  public verificarPropostaCandidatada(idproposta: number): boolean {

    let presente = false;

    for (const proposta of this.propostasCandidatadas) {
      if (proposta.id == idproposta) {
        presente = true;
      }
    }

    return presente;

  }

  public fecharModal(): void {
    this.modalRef.hide();
  }

  public removerFiltro(): void {
    this.estadoControl.reset();
    this.instituicaoControl.reset();
    this.filtroAplicado = false;

    this.estadosFiltrados = this.estadoControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nome),
        map(nome => nome ? this._filterEstado(nome) : this.estados.slice())
      );

    this.instituicoesFiltradas = this.instituicaoControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nome),
        map(nome => nome ? this._filterInstituicao(nome) : this.instituicoes.slice())
      );

    this.getPropostasPaginadas(this.cargoPessoa, 1);
    }


}
