import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Instituicao } from 'src/app/models/instituicao.model';
import { Unidade } from 'src/app/models/unidade.model';
import { InstituicaoService } from 'src/app/services/instituicao.service';
import { UnidadeService } from 'src/app/services/unidade.service';

@Component({
  selector: 'app-inserir-proposta',
  templateUrl: './inserir-proposta.component.html',
  styleUrls: ['./inserir-proposta.component.css']
})
export class InserirPropostaComponent implements OnInit {

  isLinear = true;
  primeiroPasso: FormGroup;
  segundoPasso: FormGroup;

  filtroEstado: boolean = false;
  filtroRegiao: boolean = false;
  filtroSelecionado: boolean = false;

  lugarSelecionado: string = '';

  instituicoes: Instituicao[] = [];
  unidades: Unidade[] = []

  propostas: any[] = []


  constructor(private formBuilder: FormBuilder,
    private instituicaoService: InstituicaoService,
    private unidadeService: UnidadeService) { }

  ngOnInit() {

    this.primeiroPasso = this.formBuilder.group({
      firstCtrl: ['', Validators.required],
      filtro: ['', Validators.required],
      instituicao: ['', Validators.required],
      unidade: ['',Validators.required],
    });

    this.segundoPasso = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  private resetarMapa() {
    this.filtroEstado = false;
    this.filtroRegiao = false;
    this.lugarSelecionado = "";

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

  public filtrarRegiao(nomeRegiao: string): void {

  }

  public filtrarUnidades($event: any): void{
    const idInstituicao = $event.target.value;

    this.unidadeService.buscarPorInstituicao(idInstituicao).subscribe(
      (res: Unidade[]) => {
        this.unidades = res;
      }
    )

  }

  public resetaSelectsInstUnidades(): void {
    this.primeiroPasso.controls['instituicao'].setValue('');
    this.primeiroPasso.controls['unidade'].setValue('');
  }

  public adicionaDestinoLista(): void {

    const idInstituicao = this.primeiroPasso.controls['instituicao'].value;
    const idUnidade = this.primeiroPasso.controls['unidade'].value;

    let instituicao = this.instituicoes.filter( instituicao => {
      return instituicao.id == idInstituicao;
    });

    let unidade = this.unidades.filter(unidade => {
      return unidade.id == idUnidade;
    });

    let proposta = {
      instituicao: instituicao[0].nome,
      unidade: unidade[0].nome
    }

    this.propostas.push(proposta);


    this.resetaSelectsInstUnidades();

  }

  public removerDaLista(idProposta: number): void{
    console.log(idProposta);
  }




}
