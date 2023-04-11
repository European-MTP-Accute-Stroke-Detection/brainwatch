import { Component, HostBinding, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Theme, ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public themeService: ThemeService
  ) { }

  ngOnInit() {

  }

  toggleTheme() {
    this.themeService.currentTheme.next(
      this.themeService.currentTheme.value == Theme.DARK ? Theme.LIGHT : Theme.DARK
    );
  }


}
