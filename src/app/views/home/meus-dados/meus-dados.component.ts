import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  AutenticacaoService,
  CargoService,
  EstadoService,
  InstituicaoService,
  UnidadeService
} from '../../../services';
import {UsuarioJwt} from '../../../models/jwtPayload/dadosUsuario';
import {Cargo} from '../../../models/cargo.model';
import {Unidade} from '../../../models/unidade.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Estado} from '../../../models/estado.model';
import {Instituicao} from '../../../models/instituicao.model';
import {PessoaService} from '../../../services/pessoa.service';
import {PessoaSaveDto} from '../../../models/dtos/pessoa-save.dto';
import {PessoaGetDTO} from '../../../models/dtos/pessoa-get.dto';
import {SenhaDTO} from '../../../models/dtos/senha-dto';
import {Router} from '@angular/router';
import {ProfessorService} from '../../../services/professor.service';
import {TecnicoService} from '../../../services/tecnico.service';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.css']
})
export class MeusDadosComponent implements OnInit {

  idusuario: number;
  nomeUsuario = '';
  emailUsuario = '';
  cargoUsuario = '';
  instiUsuario = '';
  unidadeUsuario = '';
  estadoUsuario = '';


  modalRef: BsModalRef;
  formEdicaoDados: FormGroup;
  formNovaSenha: FormGroup;
  formApagaDados: FormGroup;


  cargos: Cargo[] = [];
  estados: Estado[] = [];
  instituicoes: Instituicao[] = [];
  unidades: Unidade[];
  cargoUsuarioId: number;
  unidadeUsuarioId: number;
  areaUsuarioId: number;
  instiUsuarioId: number;
  pessoaGetDto: PessoaGetDTO;
  mensagemSucesso: string;
  sucesso: boolean;
  erroExclusao: boolean;
  mensagemErro: string;

  @ViewChild('exclusao') public exclusao: TemplateRef<any>;



  constructor(private autenticacaoService: AutenticacaoService,
              private formBuilder: FormBuilder,
              private unidadeService: UnidadeService,
              private cargoService: CargoService,
              private tecnicoService: TecnicoService,
              private professorService: ProfessorService,
              private estadoService: EstadoService,
              private instituicaoService: InstituicaoService,
              private modalService: BsModalService,
              private pessoaService: PessoaService,
              private router: Router) {
  }

  async ngOnInit(): Promise<any> {

    await this.carregaDadosUsuario();

    this.getTodasInstituicoes();
    this.getListaEstados();
    this.getTodasUnidades();




    this.formEdicaoDados = this.formBuilder.group({
      area: this.formBuilder.control('', [Validators.required]),
      cargo: this.formBuilder.control('', [Validators.required]),
      estado: this.formBuilder.control('', [Validators.required]),
      instituicao: this.formBuilder.control('', [Validators.required]),
      unidade: this.formBuilder.control('', [Validators.required]),
    });

    this.formNovaSenha = this.formBuilder.group({
      senhaAtual: this.formBuilder.control('', [Validators.required]),
      novaSenha: this.formBuilder.control('', [Validators.required]),
      novaSenhaConfirmacao: this.formBuilder.control('', [Validators.required]),
    });

    this.formApagaDados = this.formBuilder.group({
      senhaApagarDados: this.formBuilder.control('', [Validators.required]),
    });


  }


  public carregaDadosUsuario(): void {

    this.idusuario = this.autenticacaoService.dadosUsuarioJWT().id;


    this.pessoaService.buscar(this.idusuario).subscribe(
      (res: PessoaGetDTO) => {

        this.pessoaGetDto = res;

        this.cargoUsuarioId = this.pessoaGetDto.cargo.id;

        console.log(this.pessoaGetDto);

        const cargoPessoa = this.pessoaGetDto.cargo.descricao;

        switch (cargoPessoa){
          case 'Professor':
            this.cargoUsuario = 'Professor - ' + this.pessoaGetDto.cargo.area;
            this.getCargosProfessores();
            break;

          case 'Técnico':
            this.cargoUsuario = 'Técnico - ' + this.pessoaGetDto.cargo.funcao;
            this.getCargosTecnicos();
            break;

        }

        this.emailUsuario = this.pessoaGetDto.email;
        this.nomeUsuario = this.pessoaGetDto.nome;



        this.unidadeUsuario = this.pessoaGetDto.unidade.nome;
        this.unidadeUsuarioId = this.pessoaGetDto.unidade.id;

        this.instiUsuarioId = this.pessoaGetDto.unidade.instituicao.id;
        this.instiUsuario = this.pessoaGetDto.unidade.instituicao.nome;


      }
    );


  }


  public abrirModal(template: TemplateRef<any>): void {


    this.modalRef = this.modalService.show(template);
  }

  public fecharModal(): void {
    this.mensagemSucesso = '';
    this.sucesso = false;
    this.carregaDadosUsuario();
    this.modalRef.hide();
  }


  public selectEstadoOnChange($event: any): void {
    const sigla = $event.target.value;
    this.getInstituicoesPorEstado(sigla);
    this.formEdicaoDados.controls.instituicao.enable();


  }

  public selectInstituicaOnChange($event: any): void {
    const instituicaoId = $event.target.value;
    this.getUnidadesInstituicao(instituicaoId);
    this.formEdicaoDados.controls.unidade.enable();
  }





  public getCargosTecnicos(): void {
    this.tecnicoService.listar().subscribe(
      (res: Cargo[]) => {
        this.cargos = res;
      }
    );
  }

  public getCargosProfessores(): void {
    this.professorService.listar().subscribe(
      (res: Cargo[]) => {
        this.cargos = res;
      }
    );
  }



  public getTodasInstituicoes(): void {
    this.instituicaoService.listar().subscribe(
      (res: Instituicao[]) => {
        this.instituicoes = res;
      }
    );
  }

  public getTodasUnidades(): void {
    this.unidadeService.listar().subscribe(
      (res: Unidade[]) => {
        this.unidades = res;
      }
    );
  }


  public getListaEstados(): void {
    this.estadoService.listar().subscribe(
      (res: Estado[]) => {
        this.estados = res;
      }
    );
  }

  public getInstituicoesPorEstado(sigla: string): void {
    this.instituicaoService.buscarPorEstado(sigla).subscribe(
      (res: Instituicao[]) => {
        this.instituicoes = res;
      }
    );
  }

  public getUnidadesInstituicao(idinstituicao: number): void {
    this.unidadeService.buscarPorInstituicao(idinstituicao).subscribe(
      (res: Unidade[]) => {
        this.unidades = res;
      }
    );
  }


  public salvaAlteracoes(): void {


    const cargo = this.formEdicaoDados.controls.cargo.value;
    const unidade = this.formEdicaoDados.controls.unidade.value;

    const pessoaSave: PessoaSaveDto = {
      cargo,
      unidade
    };

    console.log(pessoaSave);

    this.pessoaService.editar(this.idusuario, pessoaSave).subscribe(
      res => {
        this.sucesso = true;
        this.mensagemSucesso = 'Dados alterados com sucesso';
      },
      error => {
        console.log('erro');
      }
    );

  }

  public alteraSenha(): void {

    const senhaAtual = this.formNovaSenha.controls.senhaAtual.value;
    const senhaNova = this.formNovaSenha.controls.novaSenha.value;
    const senhaNovaConfirmacao = this.formNovaSenha.controls.novaSenhaConfirmacao.value;

    const senhaDTO: SenhaDTO = {
      senhaAtual,
      senhaNova,
      senhaNovaConfirmacao
    };

    this.pessoaService.alterarSenha(this.idusuario, senhaDTO).subscribe(
      (res) => {
        this.sucesso = true;
        this.mensagemSucesso = 'Senha alterada com sucesso.';
        this.formNovaSenha.reset();
      }
    );


  }

  public checaSenhaExclusao(): void {



    const senhaAtual = this.formApagaDados.controls.senhaApagarDados.value;
    const senhaDTO = {
      senhaAtual
    };
    this.pessoaService.verificaSenha(this.idusuario, senhaDTO).subscribe(
      res => {
       this.excluirConta(this.idusuario);
      }, error => {
        this.erroExclusao = true;
        this.mensagemErro = 'Houve um erro com sua solicitação. Verifique seus dados';
      }
    );

  }

  private excluirConta(idPessoa: number): void{
    this.pessoaService.excluir(idPessoa).subscribe(
      res => {
        this.fecharModal();
        this.abrirModal(this.exclusao);
        this.logout();
      }
    );
  }

  async logout(): Promise<any> {
    this.autenticacaoService.logout();
    await this.router.navigate(['']);

  }


}
