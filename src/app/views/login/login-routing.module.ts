import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EntrarComponent} from './entrar';
import { RecuperarSenhaComponent } from './recuperar-senha';
import {CadastrarComponent} from './cadastrar';

const routes: Routes = [
  {path: '', redirectTo: 'entrar', component: EntrarComponent},
  {path: 'entrar', component: EntrarComponent},
  {path: 'recuperar', component: RecuperarSenhaComponent},
  {path: 'cadastrar', component: CadastrarComponent},
];

@NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
          })
export class LoginRoutingModule {
}
