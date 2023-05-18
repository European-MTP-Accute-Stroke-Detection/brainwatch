import { Component,OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientsService } from '../../services/patients.service';
import { Patient } from 'src/app/model/patient';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-part',
  templateUrl: './edit-part.component.html',
  styleUrls: ['./edit-part.component.scss']
})
export class EditPartComponent {

  //private patientId = JSON.parse(localStorage.getItem('patient')!).uid; 
  form: FormGroup = this.fb.group({
  
    firstname: ['', Validators.required   ],
      lastname: ['', Validators.required],
      gender:['', Validators.required],
      age: [18, Validators.required],
      bmi:[19],
      work:[''],
      residency:[''],
      averageGlucoseLevel: [120],
      hypertension: [false],
      heartDisease:[false],
      married: [false],
      smoke: [false],
   
 

  });

  patient:Patient;
  
  constructor(private _snackBar: MatSnackBar,private patientsService: PatientsService,private fb: FormBuilder, private dialogRef: MatDialogRef<EditPartComponent>, @Inject(MAT_DIALOG_DATA) public data: { patient: Patient}) {
    
  }


  ngOnInit(): void {
   
    this.form = this.fb.group({
      firstname: ['', Validators.required   ],
      lastname: ['', Validators.required],
      gender:['', Validators.required],
      age: [18, Validators.required],
      bmi:[19],
      work:[''],
      residency:[''],
      averageGlucoseLevel: [120],
      hypertension: [false],
      heartDisease:[false],
      married: [false],
      smoke: [false],
     
    });
    this.patient = this.data.patient;
   
    // Set the form controls to the patient properties
    this.form.patchValue({
      
      firstname: this.patient.firstname,
      lastname: this.patient.lastname,
      averageGlucoseLevel: this.patient.averageGlucoseLevel,
      hypertension: this.patient.hypertension,
      married: this.patient.married,
      smoke: this.patient.smoke,
      age: this.patient.age,
      heartDisease: this.patient.heartDisease,
      bmi:this.patient.bmi,
      gender:this.patient.gender,
      work:this.patient.work,
      residency: this.patient.residency

    });
  }

  close() {
    this.dialogRef.close();
  }

  submit() {  
   

    if (this.form.valid) {
      this.patientsService.update(this.patient.patientId,this.form.value);
      this.openSnackBar()
    }
    close();
  }
  openSnackBar() {
    this._snackBar.open('Patient edited successfully!', 'Close', {
      duration: 3000, // Set the duration for how long the snackbar should be visible
     
    });
  }
}
