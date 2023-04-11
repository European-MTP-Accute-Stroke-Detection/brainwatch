import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsHomeComponent } from './settings/components/settings-home/settings-home.component';
import { WorkbenchHomeComponent } from './workbench/workbench-home.component';

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
