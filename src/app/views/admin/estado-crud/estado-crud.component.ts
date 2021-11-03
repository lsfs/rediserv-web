import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {take} from 'rxjs/operators';
import {Estado} from '../../../models/estado.model';
import {EstadoService} from '../../../services/estado.service';

@Component({
  selector: 'app-estado-crud',
  templateUrl: './estado-crud.component.html',
  styleUrls: ['./estado-crud.component.css']
})
export class EstadoCrudComponent implements OnInit {

  formEstado: FormGroup;
  modoEdicao = false;
  estadoEmEdicao: Estado;
  haErros = false;
  haSucesso = false;
  mensagemConteudo = '';
  estados: Estado[] = [];

  paginaAtual = 1;
  paginas: Array<number>;
  totalRegistros: number;


  constructor(private formBuilder: FormBuilder,
              private estadoService: EstadoService) {
  }

  ngOnInit(): void {

    this.formEstado = this.formBuilder.group({
      nomeEstado: this.formBuilder.control('', [Validators.required]),
      sigla: this.formBuilder.control('', [Validators.required]),
      regiao: this.formBuilder.control('', [Validators.required])
    });

    this.getListaEstados();

  }

  public getListaEstados(): void {

    this.estadoService.listarPaginada(this.paginaAtual).subscribe(
      listaPaginada => {
        this.estados = listaPaginada.content;
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
    this.getListaEstados();
  }


  public salvar(): void {

    const nome = this.formEstado.value.nomeEstado;
    const sigla = this.formEstado.value.sigla;
    const regiao = this.formEstado.value.regiao;

    const estadoCriado: Estado = {
      nome,
      sigla,
      regiao
    };


    if (!this.modoEdicao) {

      this.criar(estadoCriado);

    } else {
      estadoCriado.id = this.estadoEmEdicao.id;
      this.editar(estadoCriado);
    }
  }

  public criar(estadoCriado: Estado): void{

    this.estadoService.criar(estadoCriado).pipe(take(1))
      .subscribe((estado: Estado) => {
          this.haSucesso = true;
          this.mensagemConteudo = 'Estado cadastrado com sucesso';
          this.resetaCampos();
          this.getListaEstados();
        },
        error => {
          this.haErros = true;
          this.mensagemConteudo = 'Falha ao inserir novo registro';
        });

  }

  public editar(estadoCriado: Estado): void{

    this.estadoService.editar(estadoCriado.id, estadoCriado)
      .subscribe((estado: Estado) => {

          this.haSucesso = true;
          this.mensagemConteudo = 'Estado alterado com sucesso';
          this.getListaEstados();
          this.encerraEdicao();
        },
        error => {
          this.haErros = true;
          this.mensagemConteudo = 'Falha ao alterar registro';
        });
  }

  public entrarEdicao(estado: Estado): void {

    this.formEstado.controls.nomeEstado.setValue(estado.nome);
    this.formEstado.controls.sigla.setValue(estado.sigla);
    this.formEstado.controls.regiao.setValue(estado.regiao);
    this.estadoEmEdicao = estado;
    this.modoEdicao = true;
  }

  public encerraEdicao(): void {
    this.modoEdicao = false;
    this.resetaCampos();
  }

  public resetaCampos(): void {
    this.formEstado.reset();
  }


  public apagar(estado: Estado): void{

    const idestado = estado.id;

    this.estadoService.excluir(idestado)
      .subscribe(() => {

        this.haSucesso = true;
        this.mensagemConteudo = 'Estado excluído com sucesso';

        this.estados.splice(
          this.estados.indexOf(estado, 0), 1);

      }, error => {

        this.haErros = true;
        this.mensagemConteudo = 'Falha ao excluír registro';
      });
  }




  public resetaMensagens(): void {
    this.haErros = false;
    this.haSucesso = false;
  }


}
