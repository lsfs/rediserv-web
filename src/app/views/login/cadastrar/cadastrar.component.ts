import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  dadosIncorretos = false;
  enviadoRecu = false;


  constructor() { }

  ngOnInit(): void {
  }

}
