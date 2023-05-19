import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Case } from 'src/app/model/case';
import { Patient } from 'src/app/model/patient';
import { CasesService } from '../../services/cases.service';
import { PatientsService } from 'src/app/patients/services/patients.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-part',
  templateUrl: './view-part.component.html',
  styleUrls: ['./view-part.component.scss']
})
export class ViewPartComponent {
  patientsfromDB: Patient[] = [];


  dataSource: any;// new MatTableDataSource<Patient>(this.patientsfromDB);
  form: FormGroup = this.fb.group({
    date: [{ value: '', readonly: true }],
    text: [{ value: '', readonly: true }],
    pid: [{ value: null, readonly: true }]
  });

  case: Case;

  constructor(
    private router: Router,
    private casesService: CasesService,
    private patientsService: PatientsService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ViewPartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cases: Case }
  ) { }

  ngOnInit(): void {
    this.patientsService.getAll().valueChanges().subscribe((data: Patient[]) => {
      this.patientsfromDB = data;

    });
    this.form = this.fb.group({
      date: [{ value: '', readonly: true }],
      text: [{ value: '', readonly: true }],
      patientName: [{ value: null, readonly: true }]
    });

    this.case = this.data.cases;

    this.form.patchValue({
      date: this.case.date,
      text: this.case.notes,
      patientName: this.case.patient.firstname + ' ' + this.case.patient.lastname
    });
  }

  close() {
    this.dialogRef.close();
  }

}
