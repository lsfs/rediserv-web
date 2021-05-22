import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InserirPropostaComponent} from './inserir-proposta';


const routes: Routes = [
  // {path: '', redirectTo: 'entrar', component: EntrarComponent},
  {path: 'inserir-proposta', component: InserirPropostaComponent},
];

@NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
          })
export class HomeRoutingModule {
}
