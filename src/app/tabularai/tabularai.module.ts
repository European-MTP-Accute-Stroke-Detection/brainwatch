import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabularaiComponent } from './tabularai.component';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { TabularaiService } from './services/tabularai.service';
import { ChartComponent } from './components/chart/chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    TabularaiComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    NgxChartsModule
  ],
  providers: [
    TabularaiService
  ]
})
export class TabularaiModule { }
