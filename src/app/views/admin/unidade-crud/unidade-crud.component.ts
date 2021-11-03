import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Cidade} from '../../../models/cidade.model';
import {CidadeService} from '../../../services/cidade.service';
import {take} from 'rxjs/operators';
import {Unidade} from '../../../models/unidade.model';
import {UnidadeGetDto} from '../../../models/dtos/unidade-get.dto';
import {InstituicaoService} from '../../../services/instituicao.service';
import {Instituicao} from '../../../models/instituicao.model';
import {UnidadeService} from '../../../services/unidade.service';
import {UnidadeSaveDto} from '../../../models/dtos/unidade-save.dto';

@Component({
  selector: 'app-unidade-crud',
  templateUrl: './unidade-crud.component.html',
  styleUrls: ['./unidade-crud.component.css']
})
export class UnidadeCrudComponent implements OnInit {


  formUnidade: FormGroup;
  modoEdicao = false;
  unidadeEmEdicao: UnidadeGetDto;
  haErros = false;
  haSucesso = false;
  mensagemConteudo = '';
  unidades: UnidadeGetDto[] = [];
  cidades: Cidade[] = [];
  instituicoes: Instituicao[] = [];
  paginaAtual = 1;
  paginas: Array<number>;
  totalRegistros: number;


  constructor(private formBuilder: FormBuilder,
              private unidadeService: UnidadeService,
              private cidadeService: CidadeService,
              private instituicaoService: InstituicaoService) {
  }

  ngOnInit(): void {

    this.formUnidade = this.formBuilder.group({
      nomeUnidade: this.formBuilder.control('', [Validators.required]),
      endereco: this.formBuilder.control('', [Validators.required]),
      instituicao: this.formBuilder.control('', [Validators.required]),
      cidade: this.formBuilder.control('', [Validators.required]),
      telefone: this.formBuilder.control('', [Validators.required]),
    });


    this.getListaUnidades();
    this.getListaInstituicoes();

  }

  public getListaUnidades(): void {

    this.unidadeService.listarPaginada(this.paginaAtual).subscribe(
      listaPaginada => {
        this.unidades = listaPaginada.content;
        this.paginas = new Array(listaPaginada.totalPages);
        this.totalRegistros = listaPaginada.totalElements;
      },
      (error) => {
        console.log(error.error.message);
      });

  }

  public async pageChanged(event): Promise<any> {
    this.paginaAtual = event;
    await this.trocaPagina(this.paginaAtual);
  }

  protected async trocaPagina(i): Promise<any> {
    this.paginaAtual = i;
    this.getListaUnidades();
  }


  public salvar(): void {

    const nome = this.formUnidade.value.nomeUnidade;
    const endereco = this.formUnidade.value.endereco;
    const instituicao = this.formUnidade.value.instituicao;
    const cidade = this.formUnidade.value.cidade;
    const telefone = this.formUnidade.value.telefone;

    const unidadeCriada: UnidadeSaveDto = {
      nome,
      endereco,
      instituicao,
      cidade,
      telefone
    };

    if (!this.modoEdicao) {

      this.criar(unidadeCriada);

    } else {
      unidadeCriada.id = this.unidadeEmEdicao.id;
      this.editar(unidadeCriada);
    }
  }

  public criar(unidadeCriada: UnidadeSaveDto): void{

    this.unidadeService.criar(unidadeCriada).pipe(take(1))
      .subscribe((unidade: Unidade) => {
          this.haSucesso = true;
          this.mensagemConteudo = 'Unidade cadastrada com sucesso';
          this.resetaCampos();
          this.getListaUnidades();
        },
        error => {
          this.haErros = true;
          this.mensagemConteudo = 'Falha ao inserir novo registro';
        });

  }

  public editar(unidadeCriada: UnidadeSaveDto): void{

    this.unidadeService.editar(unidadeCriada.id, unidadeCriada)
      .subscribe((unidade: Unidade) => {

          this.haSucesso = true;
          this.mensagemConteudo = 'Cidade alterada com sucesso';
          this.getListaUnidades();
          this.encerraEdicao();
        },
        error => {
          this.haErros = true;
          this.mensagemConteudo = 'Falha ao alterar registro';
        });
  }

  public entrarEdicao(unidade: UnidadeGetDto): void {


    this.resetaMensagens();
    this.getListaCidades(unidade.instituicao.estado.id);

    this.formUnidade.controls.nomeUnidade.setValue(unidade.nome);
    this.formUnidade.controls.endereco.setValue(unidade.endereco);
    this.formUnidade.controls.instituicao.setValue(unidade.instituicao.id);
    this.formUnidade.controls.telefone.setValue(unidade.telefone);
    this.formUnidade.controls.cidade.setValue(unidade.idcidade);
    this.unidadeEmEdicao = unidade;
    this.modoEdicao = true;
  }

  public encerraEdicao(): void {
    this.modoEdicao = false;
    this.resetaCampos();
  }

  public resetaCampos(): void {
    this.formUnidade.reset();
  }


  public apagar(unidade: UnidadeGetDto): void{

    this.resetaMensagens();

    const idUnidade = unidade.id;

    this.unidadeService.excluir(idUnidade)
      .subscribe(() => {

        this.haSucesso = true;
        this.mensagemConteudo = 'Estado excluído com sucesso';

        this.unidades.splice(
          this.unidades.indexOf(unidade, 0), 1);

      }, error => {

        this.haErros = true;
        this.mensagemConteudo = 'Falha ao excluír registro';
      });
  }


  public resetaMensagens(): void {
    this.haErros = false;
    this.haSucesso = false;
  }

  private getListaInstituicoes(): void {
    this.instituicaoService.listar().subscribe(
      (res: Instituicao[]) => {
        this.instituicoes = res;
      }
    );
  }

  public selectInstituicaoOnChange($event: any): void {
    const idInstituicao: number = $event.target.value;


    const instituicaoFiltrada: Instituicao[] = this.instituicoes.filter(
        instituicao =>  instituicao.id == idInstituicao
    );

    const idEstado = instituicaoFiltrada[0].estado.id;
    this.getListaCidades(idEstado);
  }

  private getListaCidades(idestado: number): void {
    this.cidadeService.buscarPorEstado(idestado).subscribe(
      (res: Cidade[]) => {
        this.cidades = res;
      }
    );
  }



}
