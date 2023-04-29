import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasesComponent } from './cases.component';
import { CasesService } from './services/cases.service';


@NgModule({
  declarations: [
    CasesComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    CasesService
  ]
})
export class CasesModule { }
