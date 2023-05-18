import { Component,OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientsService } from 'src/app/patients/services/patients.service';
import { Patient } from 'src/app/model/patient';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-delete-card',
  templateUrl: './delete-card.component.html',
  styleUrls: ['./delete-card.component.scss']
})
export class DeleteCardComponent {
  patient:Patient;


  constructor(private _snackBar: MatSnackBar,private patientsService: PatientsService,private fb: FormBuilder, private dialogRef: MatDialogRef<DeleteCardComponent>, @Inject(MAT_DIALOG_DATA) public data: { patient: Patient }){}
  
  ngOnInit(): void {
    this.patient = this.data.patient;
  }

  deletePatient() {
    
    this.patientsService.delete(this.patient.uid);
    this.openSnackBar()
    this.dialogRef.close();
      
  }
  exit(){   
    this.dialogRef.close();
  }
  openSnackBar() {
    this._snackBar.open('Patient deleted successfully!', 'Close', {
      duration: 3000, // Set the duration for how long the snackbar should be visible
     
    });
  }


}
