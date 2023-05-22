import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasesComponent } from './cases.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { DeleteCardComponent } from './components/delete-card/delete-card.component';
import { EditPartComponent } from './components/edit-part/edit-part.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ViewPartComponent } from './components/view-part/view-part.component';
import { AngularMaterialModule } from '../angular-material.module';
import { AuthModule } from '../auth/auth.module';
import { PatientsModule } from '../patients/patients.module';
import { AppRoutingModule } from '../app-routing.module';
import { MatNativeDateModule } from '@angular/material/core';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { DatePipe } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
    AppRoutingModule,
    MatNativeDateModule,
    DatePipe,
    MatProgressBarModule

  ]
})
export class CasesModule {
}
