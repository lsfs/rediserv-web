import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InserirPropostaComponent} from './inserir-proposta';
import {HomeRoutingModule} from './home.routing.module';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashboardUserComponent} from './dashboard-user';
import {SharedHomeComponent} from './shared-home';
import {NavbarComponent} from './navbar';
import {VisaoPropostasComponent} from './visao-propostas/visao-propostas.component';
import {BsModalService, ModalModule} from 'ngx-bootstrap/modal';
import {NgxPaginationModule} from 'ngx-pagination';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {PropostasSubmetidasComponent} from './propostas-submetidas/propostas-submetidas.component';
import {PropostasRascunhosComponent} from './propostas-rascunhos/propostas-rascunhos.component';
import {PropostasCandidatadasComponent} from './propostas-candidatadas/propostas-candidatadas.component';
import {ContatoComponent} from './contato/contato.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MeusDadosComponent} from './meus-dados/meus-dados.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [InserirPropostaComponent, DashboardUserComponent, VisaoPropostasComponent, SharedHomeComponent, NavbarComponent,
    PropostasSubmetidasComponent, PropostasRascunhosComponent, PropostasCandidatadasComponent, MeusDadosComponent,
    ContatoComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSliderModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    NgxPaginationModule,
    FontAwesomeModule,
    MatAutocompleteModule,
    MatDialogModule
  ]
})
export class HomeModule {
}
