import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inserir-proposta',
  templateUrl: './inserir-proposta.component.html',
  styleUrls: ['./inserir-proposta.component.css']
})
export class InserirPropostaComponent implements OnInit {

  isLinear = true;
  primeiroPasso: FormGroup;
  secondFormGroup: FormGroup;

  filtroEstado: boolean = false;
  filtroRegiao: boolean = false;
  filtroSelecionado: boolean = false;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {

    this.primeiroPasso = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      filtro: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  private resetarMapa() {
    this.filtroEstado = false;
    this.filtroRegiao = false;
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

  public filtrarEstado(sigla: String): void{

  }

  public filtrarRegiao(nomeRegiao: String) : void {
    
  }

  


}
