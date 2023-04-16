import { Component, HostBinding } from '@angular/core';
import { Theme, ThemeService } from './shared/services/theme.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  bodyElement = document.body;

  constructor(
    private themeService: ThemeService,

  ) { }

  ngOnInit(): void {
    this.themeService.currentTheme.subscribe((theme) => {
      if (this.bodyElement.classList.contains('darkMode')) {
        this.bodyElement.classList.remove('darkMode');
      } else {
        this.bodyElement.classList.add('darkMode');
      }
    });
  }

}
