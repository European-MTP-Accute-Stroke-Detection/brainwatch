import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkbenchHomeComponent } from './workbench-home.component';
import { AngularMaterialModule } from './../angular-material.module';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { DwvModule } from '../dwv/dwv.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../environments/environment';
import { AiModelsComponent } from './components/ai-models/ai-models.component';
import { TabularAiComponent } from './components/tabular-ai/tabular-ai.component';

@NgModule({
  declarations: [
    WorkbenchHomeComponent,
    FileUploadComponent,
    AiModelsComponent,
    TabularAiComponent,
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
