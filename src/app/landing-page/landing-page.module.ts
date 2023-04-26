import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { AngularMaterialModule } from '../angular-material.module';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    AppRoutingModule
  ]
})
export class LandingPageModule { }
