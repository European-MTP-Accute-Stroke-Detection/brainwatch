import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkbenchHomeComponent } from './workbench-home.component';
import { AngularMaterialModule } from './../angular-material.module';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { DwvModule } from '../dwv/dwv.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../environments/environment';
import { AiModelsComponent } from './components/ai-models/ai-models.component';
import { CaseInfoComponent } from './components/case-info/case-info.component';
import { CasesModule } from '../cases/cases.module';
import { DicomViewerModule } from '../dicom-viewer/dicom-viewer.module';
import { PatientInfoComponent } from './components/patient-info/patient-info.component';
import { AiResultsComponent } from './components/ai-results/ai-results.component';
import { DicomInfoComponent } from './components/dicom-info/dicom-info.component';
import { AdvancedAnalysisComponent } from './components/advanced-analysis/advanced-analysis.component';

@NgModule({
  declarations: [
    WorkbenchHomeComponent,
    FileUploadComponent,
    AiModelsComponent,
    CaseInfoComponent,
    PatientInfoComponent,
    AiResultsComponent,
    DicomInfoComponent,
    AdvancedAnalysisComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    DwvModule,
    DicomViewerModule,
    CasesModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  exports: [
    WorkbenchHomeComponent
  ]
})
export class WorkbenchModule { }
