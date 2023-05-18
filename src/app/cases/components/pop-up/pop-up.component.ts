import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CasesService } from '../../services/cases.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Patient } from 'src/app/model/patient';
import { MatTableDataSource } from '@angular/material/table';
import { PatientsService } from 'src/app/patients/services/patients.service';
import { Router } from '@angular/router';
import { Reference } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit{
  patientsfromDB: Patient[] = [];  
  selectedPatient : Reference<Patient>;

  dataSource :any;// new MatTableDataSource<Patient>(this.patientsfromDB);
  form: FormGroup = this.fb.group({
   
    date: ['', Validators.required],
    text: [''],
    pid: [null]
 


});

constructor(private _snackBar: MatSnackBar,private router: Router,private casesService:CasesService,private patientsService : PatientsService,private fb: FormBuilder, private dialogRef: MatDialogRef<PopUpComponent>) {}
ngOnInit(): void {
  this.patientsService.getPatientsByUserId().valueChanges().subscribe((data: Patient[]) => {
    this.patientsfromDB = data;
    this.initializeForm();
  });
  
}
  initializeForm() {
    
   
  this.form= this.fb.group({
    
    date: ['', Validators.required],
    text: [''],
    pid: [null]

 
   
  });
} 

close() {
  this.dialogRef.close();
}

submit() {
  if (this.form.valid) {
   
  this.casesService.create({...this.form.value}); 
  this.openSnackBar();
  this.dialogRef.close();
    
  }
}
openSnackBar() {
  this._snackBar.open('Case added successfully!', 'Close', {
    duration: 3000, // Set the duration for how long the snackbar should be visible
   
  });
}
}