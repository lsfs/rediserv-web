import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirPropostaComponent } from './inserir-proposta/inserir-proposta.component';
import {HomeRoutingModule} from './home-routing.module';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatSliderModule} from '@angular/material/slider'
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';






@NgModule({
  declarations: [InserirPropostaComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSliderModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class HomeModule { }
