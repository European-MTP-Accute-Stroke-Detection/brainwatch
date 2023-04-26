import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AngularMaterialModule } from '../angular-material.module';
import { WorkbenchHomeComponent } from '../workbench/workbench-home.component';
import { SharedModule } from '../shared/shared.module';
import { AuthBoxComponent } from './components/auth-box/auth-box.component';
import { AppRoutingModule } from '../app-routing.module';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

@NgModule({
    declarations: [
        RegisterComponent,
        LoginComponent,
        AuthBoxComponent,
        VerifyEmailComponent,
    ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        AppRoutingModule,
        SharedModule
    ],
    providers: [
        AuthService,
        UserService
    ]
})
export class AuthModule { }
