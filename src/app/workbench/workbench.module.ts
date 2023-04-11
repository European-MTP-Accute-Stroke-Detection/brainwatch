import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkbenchHomeComponent } from './workbench-home.component';
import { AngularMaterialModule } from './../angular-material.module';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { DwvModule } from '../dwv/dwv.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../environments/environment';

@NgModule({
  declarations: [
    WorkbenchHomeComponent,
    FileUploadComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    DwvModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  exports: [
    WorkbenchHomeComponent
  ]
})
export class WorkbenchModule { }
