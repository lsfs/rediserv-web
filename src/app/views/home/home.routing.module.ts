import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InserirPropostaComponent} from './inserir-proposta';
import {DashboardUserComponent} from './dashboard-user';
import {AuthGuard} from '../../services/guards/auth.guard';
import {VisaoPropostasComponent} from './visao-propostas/visao-propostas.component';
import {PropostasSubmetidasComponent} from './propostas-submetidas/propostas-submetidas.component';
import {PropostasRascunhosComponent} from './propostas-rascunhos/propostas-rascunhos.component';
import {PropostasCandidatadasComponent} from './propostas-candidatadas/propostas-candidatadas.component';
import {ContatoComponent} from './contato/contato.component';
import {MeusDadosComponent} from './meus-dados/meus-dados.component';


const routes: Routes = [
  {path: '', redirectTo: 'dashboard', component: DashboardUserComponent,  canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardUserComponent,  canActivate: [AuthGuard]},
  {path: 'propostas', component: VisaoPropostasComponent,  canActivate: [AuthGuard]},
  {path: 'propostas/submetidas', component: PropostasSubmetidasComponent,  canActivate: [AuthGuard]},
  {path: 'propostas/rascunhos', component: PropostasRascunhosComponent,  canActivate: [AuthGuard]},
  {path: 'propostas/candidatadas', component: PropostasCandidatadasComponent,  canActivate: [AuthGuard]},
  {path: 'propostas/nova', component: InserirPropostaComponent,  canActivate: [AuthGuard]},
  {path: 'dados', component: MeusDadosComponent,  canActivate: [AuthGuard]},
  {path: 'contato', component: ContatoComponent,  canActivate: [AuthGuard]},
];

@NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
          })
export class HomeRoutingModule {
}
