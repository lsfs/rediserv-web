import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Estado} from '../../../models/estado.model';
import {EstadoService} from '../../../services/estado.service';
import {take} from 'rxjs/operators';
import {Cidade} from '../../../models/cidade.model';
import {CidadeService} from '../../../services/cidade.service';
import {CidadeSaveDTO} from '../../../models/dtos/cidade-save.dto';

@Component({
  selector: 'app-cidade-crud',
  templateUrl: './cidade-crud.component.html',
  styleUrls: ['./cidade-crud.component.css']
})
export class CidadeCrudComponent implements OnInit {

  formCidade: FormGroup;
  modoEdicao = false;
  cidadeEmEdicao: Cidade;
  haErros = false;
  haSucesso = false;
  mensagemConteudo = '';
  cidades: Cidade[] = [];
  estados: Estado[] = [];
  paginaAtual = 1;
  paginas: Array<number>;
  totalRegistros: number;


  constructor(private formBuilder: FormBuilder,
              private cidadeService: CidadeService,
              private estadoService: EstadoService) {
  }

  ngOnInit(): void {

    this.formCidade = this.formBuilder.group({
      nomeCidade: this.formBuilder.control('', [Validators.required]),
      estado: this.formBuilder.control('', [Validators.required]),
    });

    this.getListaCidades();
    this.getListaEstados();

  }

  public getListaCidades(): void {

    this.cidadeService.listarPaginada(this.paginaAtual).subscribe(
      listaPaginada => {
        this.cidades = listaPaginada.content;
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
    this.getListaCidades();
  }


  public salvar(): void {

    const nome = this.formCidade.value.nomeCidade;
    const estado = this.formCidade.value.estado;

    const cidadeCriada: CidadeSaveDTO = {
      nome,
      estado,
    };


    if (!this.modoEdicao) {

      this.criar(cidadeCriada);

    } else {
      cidadeCriada.id = this.cidadeEmEdicao.id;
      this.editar(cidadeCriada);
    }
  }

  public criar(cidadeCriada: CidadeSaveDTO): void{

    this.cidadeService.criar(cidadeCriada).pipe(take(1))
      .subscribe((cidade: Cidade) => {
          this.haSucesso = true;
          this.mensagemConteudo = 'Cidade cadastrada com sucesso';
          this.resetaCampos();
          this.getListaCidades();
        },
        error => {
          this.haErros = true;
          this.mensagemConteudo = 'Falha ao inserir novo registro';
        });

  }

  public editar(cidadeCriada: CidadeSaveDTO): void{

    this.cidadeService.editar(cidadeCriada.id, cidadeCriada)
      .subscribe((cidade: Cidade) => {

          this.haSucesso = true;
          this.mensagemConteudo = 'Cidade alterada com sucesso';
          this.getListaCidades();
          this.encerraEdicao();
        },
        error => {
          this.haErros = true;
          this.mensagemConteudo = 'Falha ao alterar registro';
        });
  }

  public entrarEdicao(cidade: Cidade): void {

    this.resetaMensagens();


    this.formCidade.controls.nomeCidade.setValue(cidade.nome);
    this.formCidade.controls.estado.setValue(cidade.estado.id);
    this.cidadeEmEdicao = cidade;
    this.modoEdicao = true;
  }

  public encerraEdicao(): void {
    this.modoEdicao = false;
    this.resetaCampos();
  }

  public resetaCampos(): void {
    this.formCidade.reset();
  }


  public apagar(cidade: Cidade): void{

    this.resetaMensagens();

    const idcidade = cidade.id;

    this.cidadeService.excluir(idcidade)
      .subscribe(() => {

        this.haSucesso = true;
        this.mensagemConteudo = 'Estado excluído com sucesso';

        this.cidades.splice(
          this.cidades.indexOf(cidade, 0), 1);

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
