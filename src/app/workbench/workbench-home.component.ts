import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CasesService } from '../cases/services/cases.service';
import { Case } from '../model/case';
import { Scan } from '../model/scan';
import { FbUtilsService } from '../shared/services/fb-utils.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Patient } from '../model/patient';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HttpClient } from '@angular/common/http';
//import { TagsDialogComponent } from './tags-dialog.component';
import { BehaviorSubject, Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import { AnyMxRecord } from 'dns';
import { DicomsService } from './services/dicoms.service';
import { AiModelsComponent } from './components/ai-models/ai-models.component';
import { Model } from '../model/model';



@Component({
  selector: 'app-workbench-home',
  templateUrl: './workbench-home.component.html',
  styleUrls: ['./workbench-home.component.scss']
})
export class WorkbenchHomeComponent implements OnInit, OnDestroy {

  loadProgress = 0;

  caseId: string;
  case: Case;
  patient: Patient;

  newDicomViewer: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private casesService: CasesService,
    private fbUtils: FbUtilsService,
    private fbStorage: AngularFireStorage,
    private _snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient,
    private dicomsService: DicomsService
  ) { }

  ngOnDestroy(): void {
    this.dicomsService.reset();
  }

  ngOnInit(): void {
    this.caseId = this.route.snapshot.paramMap.get('caseId');
    this.newDicomViewer = this.route.snapshot.queryParamMap.get('new') === 'true';
    this.casesService.getOne(this.caseId).valueChanges({ idField: 'uid' })
      .subscribe(data => {
        if (data && Object.keys(data).length > 1) {
          this.case = data;
          this.dicomsService.currentCase$.next(this.case);
          console.log('initing workbench')
          this.fetchScans();
          this.fetchPatient();
          this.fetchModels();
        } else {
          this._snackBar.open('No case found for the specified ID', 'Close', {
            duration: 3000,
            panelClass: 'error-snackbar',
          });
          this.router.navigateByUrl('/cases')
        }
      });
  }

  async fetchModels() {
    this.fbStorage.ref(`Cases/${this.case.uid}/results/`).listAll().subscribe(async list => {
      const modelVals = list.prefixes.map(obj => obj.name);
      this.dicomsService.updateModels(modelVals);
    })
  }

  async fetchPatient() {
    if (this.case.patientRef)
      this.case.patientRef.get().then(result => this.patient = result.data())
    else
      this.patient = {} as any;
  }

  fetchScans() {
    this.casesService.getOne(this.caseId).collection<Scan>('scans').valueChanges({ idField: 'uid' })
      .subscribe(async data => {
        for (let scan of data) {
          scan.downloadUrl = await firstValueFrom(this.fbStorage.ref(`Cases/${this.case.uid}/scans/${scan.uid}.dcm`).getDownloadURL());
          if (scan.results_combined) {
            const pred = scan.results_combined.prediction.predictions as unknown as string;
            const numbers = pred.substring(1, pred.length - 1).split(" ");
            scan.results_combined.prediction.predictions = numbers.map(substring => Number(substring));
            console.log(pred);
          }
          if (scan.results_combined.prediction.uncertainty) {
            const uncertainty = scan.results_combined.prediction.uncertainty as unknown as string;
            const numbers = uncertainty.substring(1, uncertainty.length - 1).split(" ");
            scan.results_combined.prediction.uncertainty = numbers.map(substring => Number(substring));
            console.log(uncertainty)
          }
        }
        this.dicomsService.scans$.next(data);
      });
  }

}
