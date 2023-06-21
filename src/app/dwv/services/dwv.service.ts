import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Scan } from 'src/app/model/scan';

@Injectable({
  providedIn: 'root'
})
export class DwvService {

  constructor() { }

  private dwvApp: any;

  private getViewController() {
    var lg = this.dwvApp.getLayerGroupByDivId('layerGroup0');
    return lg.getActiveViewLayer().getViewController();
  }

  public setWindowLevel(center: number, width: number) {
    this.getViewController().setWindowLevel(center, width);
  }

  public setDwvApp(dwvApp: any) {
    this.dwvApp = dwvApp;
  }


}
