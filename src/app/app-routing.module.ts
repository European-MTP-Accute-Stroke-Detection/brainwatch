import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkbenchHomeComponent } from './workbench/components/workbench-home/workbench-home.component';
import { SettingsHomeComponent } from './settings/components/settings-home/settings-home.component';

const routes: Routes = [
  {
    path: '',
    component: WorkbenchHomeComponent,
  },
  {
    path: 'settings',
    component: SettingsHomeComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
