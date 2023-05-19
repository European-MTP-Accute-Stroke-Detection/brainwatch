import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsComponent } from './patients.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


import { EditPartComponent } from './components/edit-part/edit-part.component';
import { DeleteCardComponent } from './components/delete-card/delete-card.component';
import { PopupComponent } from './components/popup/popup.component';
import { ViewPartComponent } from './components/view-part/view-part.component';
import { AngularMaterialModule } from '../angular-material.module';
import { AuthModule } from '../auth/auth.module';

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
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AuthModule
  ]
})
export class PatientsModule { }
