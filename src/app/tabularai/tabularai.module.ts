import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabularaiComponent } from './tabularai.component';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { PredictionResultComponent } from './components/prediction-result/prediction-result.component';



@NgModule({
  declarations: [
    TabularaiComponent,
    PredictionResultComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule
  ]
})
export class TabularaiModule { }
