import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EntrarComponent} from './entrar';
import { RecuperarSenhaComponent } from './recuperar-senha';
import {CadastrarComponent} from './cadastrar';
import {ConfirmacaoComponent} from './confirmacao/confirmacao.component';
import {ValidaEmailComponent} from './valida-email/valida-email.component';
import {SenhaNovaComponent} from './senha-nova/senha-nova.component';

const routes: Routes = [
  {path: '', redirectTo: 'entrar', component: EntrarComponent},
  {path: 'entrar', component: EntrarComponent},
  {path: 'recuperar', component: RecuperarSenhaComponent},
  {path: 'cadastrar', component: CadastrarComponent},
  {path: 'confirmar', component: ConfirmacaoComponent},
  {path: 'validar/:token', component: ValidaEmailComponent},
  {path: 'redefinir/:token', component: SenhaNovaComponent}
];

@NgModule({
            imports: [RouterModule.forChild(routes)],
            exports:  [RouterModule]
          })
export class LoginRoutingModule {
}
