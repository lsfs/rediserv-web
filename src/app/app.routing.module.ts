import {componentFactoryName} from '@angular/compiler';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NaoAutorizadoComponent} from './views/nao-autorizado/nao-autorizado.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'auth'},

  {
    path: 'auth',
    loadChildren: () => import('./views/login/login.module').then(mod => mod.LoginModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then(mod => mod.HomeModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./views/admin/admin.module').then(mod => mod.AdminModule),

  },
  {path: 'nao-autorizado', component: NaoAutorizadoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
