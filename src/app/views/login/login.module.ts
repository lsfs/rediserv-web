import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrarComponent } from './entrar/';
import { LoginRoutingModule } from './login.routing.module';
import { RecuperarSenhaComponent } from './recuperar-senha';
import { CadastrarComponent } from './cadastrar';
import { SharedComponent } from './shared/shared.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmacaoComponent} from './confirmacao/confirmacao.component';
import {ValidaEmailComponent} from './valida-email/valida-email.component';
import {SenhaNovaComponent} from './senha-nova/senha-nova.component';
import {ModalModule} from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    EntrarComponent,
    RecuperarSenhaComponent,
    CadastrarComponent,
    ConfirmacaoComponent,
    ValidaEmailComponent,
    SenhaNovaComponent,
    SharedComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ]
})
export class LoginModule { }
