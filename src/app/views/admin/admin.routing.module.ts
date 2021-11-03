import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EstadoCrudComponent} from './estado-crud/estado-crud.component';
import {CidadeCrudComponent} from './cidade-crud/cidade-crud.component';
import {InstituicaoCrudComponent} from './instituicao-crud/instituicao-crud.component';
import {UnidadeCrudComponent} from './unidade-crud';
import {AuthGuardAdmin} from '../../services/guards';
import {DashboardAdminComponent} from './dashboard-admin';



const routes: Routes = [
  {path: '', redirectTo: 'cidade', component: DashboardAdminComponent, canActivate: [AuthGuardAdmin]},
  {path: 'dashboard', component: DashboardAdminComponent, canActivate: [AuthGuardAdmin]},
  {path: 'estado', component: EstadoCrudComponent, canActivate: [AuthGuardAdmin]},
  {path: 'cidade', component: CidadeCrudComponent, canActivate: [AuthGuardAdmin]},
  {path: 'instituicao', component: InstituicaoCrudComponent, canActivate: [AuthGuardAdmin]},
  {path: 'unidade', component: UnidadeCrudComponent, canActivate: [AuthGuardAdmin]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
