import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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



@Component({
  selector: 'app-workbench-home',
  templateUrl: './workbench-home.component.html',
  styleUrls: ['./workbench-home.component.scss']
})
export class WorkbenchHomeComponent implements OnInit {

  loadProgress = 0;

  caseId: string;
  case: Case;
  scans$: BehaviorSubject<Scan[]> = new BehaviorSubject(null);
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
  ) { }

  ngOnInit(): void {
    this.caseId = this.route.snapshot.paramMap.get('caseId');
    this.newDicomViewer = this.route.snapshot.queryParamMap.get('new') === 'true';
    this.casesService.getOne(this.caseId).valueChanges({ idField: 'uid' })
      .subscribe(data => {
        if (Object.keys(data).length > 1) {
          this.case = data;
          this.fetchScans();
          this.fetchPatient();
        } else {
          this._snackBar.open('No case found for the specified ID', 'Close', {
            duration: 3000,
            panelClass: 'error-snackbar',
          });
          this.router.navigateByUrl('/cases')
        }
      });
  }

  async fetchPatient() {
    this.case.patientRef.get().then(result => this.patient = result.data()).catch(e => {
      this.patient = {} as any;
    });
  }

  fetchScans() {
    this.casesService.getOne(this.caseId).collection<Scan>('scans').valueChanges({ idField: 'uid' })
      .subscribe(async data => {
        for (let scan of data) {
          scan.downloadUrl = await firstValueFrom(this.fbStorage.ref(`Cases/${this.case.uid}/scans/${scan.uid}.dcm`).getDownloadURL());
        }
        this.scans$.next(data);
      });
  }

}
