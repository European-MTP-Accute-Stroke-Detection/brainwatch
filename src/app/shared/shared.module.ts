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
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { ThemeService } from './services/theme.service';
import { FbUtilsService } from './services/fb-utils.service';

@NgModule({
  declarations: [
    HeaderComponent,
    ThemeSwitchComponent,
    FooterComponent,
    ProfileComponent,
    SideMenuComponent
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
    SideMenuComponent
  ],
  providers: [
    ThemeService,
    FbUtilsService
  ]
})
export class SharedModule { }
