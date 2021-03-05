import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {


  dadosIncorretos : boolean = false;
  enviadoMain: boolean = false;
  enviadoRecu: boolean = false;
  enviadoNovo: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
