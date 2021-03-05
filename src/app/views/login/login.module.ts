import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrarComponent } from './entrar/';
import { LoginRoutingModule } from './login-routing.module';
import { RecuperarSenhaComponent } from './recuperar-senha';
import { CadastrarComponent } from './cadastrar';
import { SharedComponent } from './shared/shared.component';



@NgModule({
  declarations: [
    EntrarComponent,
    RecuperarSenhaComponent,
    CadastrarComponent,
    SharedComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,

  ]
})
export class LoginModule { }
