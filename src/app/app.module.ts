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

@NgModule({
  declarations: [AppComponent],
  imports: [
    DwvModule,
    AppRoutingModule,
    AngularMaterialModule,
    SharedModule,
    WorkbenchModule,
    SettingsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
