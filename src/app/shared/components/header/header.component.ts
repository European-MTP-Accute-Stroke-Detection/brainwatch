/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Theme, ThemeService } from '../../services/theme.service';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showHeader = true;
  reducedHeader = false;

  @Output() sidenavToggled: EventEmitter<void> = new EventEmitter<void>();


  constructor(
    public themeService: ThemeService,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        if (val.url.startsWith('/register') ||
          val.url.startsWith('/login') ||
          val.url.startsWith('/verify-email') || val.url == '/'
        ) {
          this.reducedHeader = true;
        }
        else {
          this.reducedHeader = false;
        }
      }
    })
  }


}
