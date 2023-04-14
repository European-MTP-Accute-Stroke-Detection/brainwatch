import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsHomeComponent } from './settings/components/settings-home/settings-home.component';
import { WorkbenchHomeComponent } from './workbench/workbench-home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { VerifyEmailComponent } from './auth/components/verify-email/verify-email.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: WorkbenchHomeComponent,
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    component: SettingsHomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
