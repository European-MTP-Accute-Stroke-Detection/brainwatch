import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public currentTheme = new BehaviorSubject(Theme.DARK);

  constructor() { }
}

export enum Theme {
  LIGHT = 'light', DARK = 'dark'
}
