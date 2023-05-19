import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from 'src/app/model/patient';
import { CasesService } from '../../services/cases.service';
import { PatientsService } from 'src/app/patients/services/patients.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Case } from 'src/app/model/case';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-part',
  templateUrl: './edit-part.component.html',
  styleUrls: ['./edit-part.component.scss']
})
export class EditPartComponent {
  patientsfromDB: Patient[] = [];
  dataSource: any;
  form: FormGroup;
  case: Case;

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private casesService: CasesService,
    private patientsService: PatientsService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditPartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cases: Case }
  ) { }

  ngOnInit(): void {
    this.patientsService.getAll().valueChanges({ idField: 'uid' }).subscribe((data: Patient[]) => {
      this.patientsfromDB = data;
    });
    this.form = this.fb.group({
      date: ['', Validators.required],
      notes: [''],
      patient: [null]
    });
    this.case = this.data.cases;
    this.form.patchValue({
      date: this.case.date,
      notes: this.case.notes,
      patient: this.case.patient
    });
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    if (this.form.valid) {
      this.casesService.update(this.case.uid, this.form.value);
      this.openSnackBar();
      this.close();
    }

  }

  openSnackBar() {
    this._snackBar.open('Case edited successfully!', 'Close', {
      duration: 3000
    });
  }

  compare(val1: Patient, val2: Patient) {
    return val1?.uid === val2?.uid;
  }
}
