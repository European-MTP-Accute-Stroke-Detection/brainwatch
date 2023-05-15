import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DicomViewerComponent } from './dicom-viewer.component';



@NgModule({
  declarations: [
    DicomViewerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DicomViewerComponent
  ]
})
export class DicomViewerModule { }
