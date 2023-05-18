import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsComponent } from './patients.component';
import {MatTableModule} from '@angular/material/table';
import {  MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'


import { EditPartComponent } from './components/edit-part/edit-part.component';
import { DeleteCardComponent } from './components/delete-card/delete-card.component';
import { PopupComponent } from './components/popup/popup.component';
import { ViewPartComponent } from './components/view-part/view-part.component';

@NgModule({
  declarations: [
    PatientsComponent,
    DeleteCardComponent,
    PopupComponent,
    EditPartComponent,
    ViewPartComponent

  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    ScrollingModule,
    MatMenuModule,
    MatListModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSnackBarModule,
    BrowserAnimationsModule
    
  ]
})
export class PatientsModule { }
