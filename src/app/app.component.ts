import { Component, HostBinding } from '@angular/core';
import { Theme, ThemeService } from './shared/services/theme.service';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  bodyElement = document.body;
  opened: boolean;
  sideNavMode: string = 'side';

  constructor(
    private themeService: ThemeService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.themeService.currentTheme.subscribe((theme) => {
      if (this.bodyElement.classList.contains('darkMode')) {
        this.bodyElement.classList.remove('darkMode');
      } else {
        this.bodyElement.classList.add('darkMode');
      }
    });
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((val: NavigationEnd) => {
      if (val.url.startsWith('/register') ||
        val.url.startsWith('/login') ||
        val.url.startsWith('/verify-email') || val.url == '/'
      ) {
        this.opened = false;
      }
      this.toggleSideNavMode(val)
    });
  }

  toggleSideNavMode(val: any) {
    if (val instanceof NavigationEnd && (val.url.endsWith('/workbench'))) {
      this.sideNavMode = 'over'
    }
    else {
      this.sideNavMode = 'side';
    }
  }

}


