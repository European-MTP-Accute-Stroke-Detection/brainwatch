import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CasesService } from '../cases/services/cases.service';
import { Case } from '../model/case';
import { Scan } from '../model/scan';
import { FbUtilsService } from '../shared/services/fb-utils.service';
import { map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Patient } from '../model/patient';
//import { TagsDialogComponent } from './tags-dialog.component';


@Component({
  selector: 'app-workbench-home',
  templateUrl: './workbench-home.component.html',
  styleUrls: ['./workbench-home.component.scss']
})
export class WorkbenchHomeComponent implements OnInit {

  loadProgress = 0;

  caseId: string;
  case: Case;
  scans: Scan[];
  patient: Patient;

  constructor(
    private route: ActivatedRoute,
    private casesService: CasesService,
    private fbUtils: FbUtilsService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.caseId = this.route.snapshot.paramMap.get('caseId');
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
    this.case.patient.get().then(result => this.patient = result.data());
  }

  fetchScans() {
    this.casesService.getOne(this.caseId).collection<Scan>('scans').valueChanges()
      .subscribe(data => {
        this.scans = data;
      });
  }

}
