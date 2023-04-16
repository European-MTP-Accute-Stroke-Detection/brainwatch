import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { AngularMaterialModule } from '../angular-material.module';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthModule } from '../auth/auth.module';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    HeaderComponent,
    ThemeSwitchComponent,
    FooterComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    ThemeSwitchComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
