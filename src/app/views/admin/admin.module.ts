import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedComponent} from './shared/shared.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminRoutingModule} from './admin.routing.module';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {EstadoCrudComponent} from './estado-crud/estado-crud.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {CidadeCrudComponent} from './cidade-crud/cidade-crud.component';
import {InstituicaoCrudComponent} from './instituicao-crud/instituicao-crud.component';
import {UnidadeCrudComponent} from './unidade-crud/unidade-crud.component';
import {DashboardAdminComponent} from './dashboard-admin/dashboard-admin.component';


@NgModule({
  declarations: [SharedComponent,
    EstadoCrudComponent,
    CidadeCrudComponent,
    InstituicaoCrudComponent,
    UnidadeCrudComponent,
    DashboardAdminComponent],

  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    NgxPaginationModule,
  ]
})
export class AdminModule {
}
