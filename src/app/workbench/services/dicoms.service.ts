import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Scan } from 'src/app/model/scan';
import { Model } from 'src/app/model/model';
import { Case } from 'src/app/model/case';

@Injectable({
  providedIn: 'root'
})
export class DicomsService {

  public currentScan$: BehaviorSubject<Scan> = new BehaviorSubject<Scan>(null)

  public scans$: BehaviorSubject<Scan[]> = new BehaviorSubject(null);

  public availableModels$: BehaviorSubject<Model[]> = new BehaviorSubject([
    {
      key: 'Default',
      value: 'default',
      isLoaded: true
    }
  ]);

  public currentCase$: BehaviorSubject<Case> = new BehaviorSubject(null);

  constructor() { }

  updateModels(modelVals: string[]) {
    this.availableModels$.next([
      {
        key: 'Default',
        value: 'default',
        isLoaded: true
      },
      ...modelVals.map(val => ({
        value: val,
        key: this.getKey(val),
        isLoaded: false
      }))
    ])
  }

  getKey(key: string) {
    switch (key) {
      case 'combined_lime_low':
        return 'Combined Lime Low'
    }
  }

  reset() {
    this.scans$.next(null);
    this.currentScan$.next(null);
    this.currentCase$.next(null)
  }
}
