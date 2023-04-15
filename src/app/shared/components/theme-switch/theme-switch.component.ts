import { Component, Input } from '@angular/core';
import { Theme, ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent {
  @Input() forMenu = false;

  constructor(
    public themeService: ThemeService
  ) { }

  toggleTheme() {
    this.themeService.currentTheme.next(
      this.themeService.currentTheme.value == Theme.DARK ? Theme.LIGHT : Theme.DARK
    );
  }
}
