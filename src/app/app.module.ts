import { NgModule } from '@angular/core';
import { DwvModule } from './dwv/dwv.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularMaterialModule } from './angular-material.module';
import { SharedModule } from './shared/shared.module';
import { WorkbenchModule } from './workbench/workbench.module';
import { SettingsModule } from './settings/settings.module';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { LandingPageModule } from './landing-page/landing-page.module';
import { CasesModule } from './cases/cases.module';
import { PatientsModule } from './patients/patients.module';
import { TabularaiModule } from './tabularai/tabularai.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AuthModule,
    CommonModule,
    BrowserModule,
    DwvModule,
    AppRoutingModule,
    AngularMaterialModule,
    SharedModule,
    WorkbenchModule,
    SettingsModule,
    LandingPageModule,
    CasesModule,
    PatientsModule,
    TabularaiModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
