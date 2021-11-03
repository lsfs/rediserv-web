import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Cidade} from "../../../models/cidade.model";
import {Estado} from "../../../models/estado.model";
import {EstadoService} from "../../../services/estado.service";
import {CidadeSaveDTO} from "../../../models/dtos/cidade-save.dto";
import {take} from "rxjs/operators";
import {Instituicao} from "../../../models/instituicao.model";
import {InstituicaoService} from "../../../services/instituicao.service";
import {InstituicaoSaveDTO} from "../../../models/dtos/instituicao-save.dto";

@Component({
  selector: 'app-instituicao-crud',
  templateUrl: './instituicao-crud.component.html',
  styleUrls: ['./instituicao-crud.component.css']
})
export class InstituicaoCrudComponent implements OnInit {

  formInstituicao: FormGroup;
  modoEdicao = false;
  instituicaoEmEdicao: Instituicao;
  haErros = false;
  haSucesso = false;
  mensagemConteudo = '';
  instituicoes: Instituicao[] = [];
  estados: Estado[] = [];
  paginaAtual = 1;
  paginas: Array<number>;
  totalRegistros: number;


  constructor(private formBuilder: FormBuilder,
              private instituicaoService: InstituicaoService,
              private estadoService: EstadoService) {
  }

  ngOnInit(): void {

    this.formInstituicao = this.formBuilder.group({
      nomeInstituicao: this.formBuilder.control('', [Validators.required]),
      sigla: this.formBuilder.control('', [Validators.required]),
      endereco: this.formBuilder.control('', [Validators.required]),
      estado: this.formBuilder.control('', [Validators.required]),
    });

    this.getListaInstituicoes();
    this.getListaEstados();

  }


  public getListaInstituicoes(): void {

    this.instituicaoService.listarPaginada(this.paginaAtual).subscribe(
      listaPaginada => {
        this.instituicoes = listaPaginada.content;
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
    this.getListaInstituicoes();
  }


  public salvar(): void {

    const nome = this.formInstituicao.value.nomeInstituicao;
    const sigla = this.formInstituicao.value.sigla;
    const endereco = this.formInstituicao.value.endereco;
    const estado = this.formInstituicao.value.estado;

    const instituicaoCriada: InstituicaoSaveDTO = {
      nome,
      sigla,
      endereco,
      estado,
    };


    if (!this.modoEdicao) {

      this.criar(instituicaoCriada);

    } else {
      instituicaoCriada.id = this.instituicaoEmEdicao.id;
      this.editar(instituicaoCriada);
    }
  }

  public criar(instituicaoCriada: InstituicaoSaveDTO): void{

    this.instituicaoService.criar(instituicaoCriada).pipe(take(1))
      .subscribe((instituicao: Instituicao) => {
          this.haSucesso = true;
          this.mensagemConteudo = 'Instituição cadastrada com sucesso';
          this.resetaCampos();
          this.getListaInstituicoes();
        },
        error => {
          this.haErros = true;
          this.mensagemConteudo = 'Falha ao inserir novo registro';
        });

  }

  public editar(instituicaoCriada: InstituicaoSaveDTO): void{

    this.instituicaoService.editar(instituicaoCriada.id, instituicaoCriada)
      .subscribe((instituicao: Instituicao) => {

          this.haSucesso = true;
          this.mensagemConteudo = 'Instituição alterada com sucesso';
          this.getListaInstituicoes();
          this.encerraEdicao();
        },
        error => {
          this.haErros = true;
          this.mensagemConteudo = 'Falha ao alterar registro';
        });
  }

  public entrarEdicao(instituicao: Instituicao): void {

    this.resetaMensagens();

    this.formInstituicao.controls.nomeInstituicao.setValue(instituicao.nome);
    this.formInstituicao.controls.sigla.setValue(instituicao.sigla);
    this.formInstituicao.controls.endereco.setValue(instituicao.endereco);
    this.formInstituicao.controls.estado.setValue(instituicao.estado.id);
    this.instituicaoEmEdicao = instituicao;
    this.modoEdicao = true;
  }

  public encerraEdicao(): void {
    this.modoEdicao = false;
    this.resetaCampos();
  }

  public resetaCampos(): void {
    this.formInstituicao.reset();
  }


  public apagar(instituicao: Instituicao): void{

    this.resetaMensagens();

    const idinstituicao = instituicao.id;

    this.instituicaoService.excluir(idinstituicao)
      .subscribe(() => {

        this.haSucesso = true;
        this.mensagemConteudo = 'Estado excluído com sucesso';

        this.instituicoes.splice(
          this.instituicoes.indexOf(instituicao, 0), 1);

      }, error => {

        this.haErros = true;
        this.mensagemConteudo = 'Falha ao excluír registro';
      });
  }


  public resetaMensagens(): void {
    this.haErros = false;
    this.haSucesso = false;
  }

  private getListaEstados(): void {
    this.estadoService.listar().subscribe(
      (res: Estado[]) => {
        this.estados = res;
      }
    );
  }



}
