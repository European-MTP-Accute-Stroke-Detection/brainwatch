import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasesComponent } from './cases.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { DeleteCardComponent } from './components/delete-card/delete-card.component';
import { EditPartComponent } from './components/edit-part/edit-part.component';
import { ViewPartComponent } from './components/view-part/view-part.component';
import { AngularMaterialModule } from '../angular-material.module';
import { AuthModule } from '../auth/auth.module';
import { PatientsModule } from '../patients/patients.module';
import { AppRoutingModule } from '../app-routing.module';
import { ScansModule } from '../scans/scans.module';

@NgModule({
  declarations: [
    CasesComponent,
    PopUpComponent,
    DeleteCardComponent,
    EditPartComponent,
    ViewPartComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    AuthModule,
    PatientsModule,
    MatInputModule,
    AppRoutingModule,
    ScansModule
  ]
})
export class CasesModule {
}
