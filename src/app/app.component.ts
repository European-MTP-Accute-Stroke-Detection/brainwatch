import { Component, HostBinding } from '@angular/core';
import { Theme, ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  @HostBinding('class') className = '';

  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.themeService.currentTheme.subscribe((theme) => {
      this.className = theme == Theme.DARK ? 'darkMode' : '';
    })
  }

}
