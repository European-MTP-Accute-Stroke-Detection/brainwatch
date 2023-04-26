import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsHomeComponent } from './settings/components/settings-home/settings-home.component';
import { WorkbenchHomeComponent } from './workbench/workbench-home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { VerifyEmailComponent } from './auth/components/verify-email/verify-email.component';
import { AuthGuard } from './auth/auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CasesComponent } from './cases/cases.component';
import { PatientsComponent } from './patients/patients.component';
import { TabularaiComponent } from './tabularai/tabularai.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
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
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
  },
  {
    path: 'cases',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CasesComponent
      },
      {
        path: ':caseId/workbench',
        component: WorkbenchHomeComponent
      }
    ]
  },
  {
    path: 'patients',
    canActivate: [AuthGuard],
    component: PatientsComponent,
  },
  {
    path: 'tabularai',
    canActivate: [AuthGuard],
    component: TabularaiComponent,
  },
  {
    path: 'workbench',
    canActivate: [AuthGuard],
    component: WorkbenchHomeComponent,
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
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
