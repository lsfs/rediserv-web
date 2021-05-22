import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Area } from 'src/app/models/area.model';
import { Cargo } from 'src/app/models/cargo.model';
import { Estado } from 'src/app/models/estado.model';
import { AreaService } from 'src/app/services/area.service';
import { CargoService } from 'src/app/services/cargo.service';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  form: FormGroup;

  dadosIncorretos = false;
  enviadoRecu = false;

  areas: Area[] = [];
  cargos: Cargo[] = [];
  estados: Estado[] = [];

  areaSelecionada : boolean = false;

  constructor(private formBuilder: FormBuilder,
              private areaService: AreaService,
              private estadoService: EstadoService) {

  }

  ngOnInit() {

    this.form = this.formBuilder
    .group({
      email: this.formBuilder.control('', [Validators.required]),
      area:  this.formBuilder.control('',[Validators.required]),
      cargo:  this.formBuilder.control({value:'', disabled: true},[Validators.required]),
      estado: this.formBuilder.control('',[Validators.required]),
      instituicao: this.formBuilder.control({value:'', disabled: true},[Validators.required]),
      unidade: this.formBuilder.control({value:'', disabled: true},[Validators.required]),
    })

    this.getListaAreas();
    this.getListaEstados();
 

  }


  public getListaAreas(): void {
    this.areaService.listar().subscribe(
      (res: Area[]) => {
        this.areas = res;
      });
  }

  public getListaCargos(idArea:number): void {
    this.areaService.listarCargos(idArea).subscribe(
      (res: Cargo[]) => {
        this.cargos = res;
        this.form.controls['cargo'].enable();
      });
     
  }

  public getListaEstados(): void{
    this.estadoService.listar().subscribe(
      (res:Estado[]) => {
        this.estados = res;
      }
    )
  }

  public selectAreaOnChange($event: any): void {
    const id = $event.target.value;
    this.getListaCargos(id);
  }


}
