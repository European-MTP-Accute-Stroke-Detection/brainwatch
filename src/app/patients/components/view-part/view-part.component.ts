import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Patient } from 'src/app/model/patient';
import { PatientsService } from '../../services/patients.service';

@Component({
  selector: 'app-view-part',
  templateUrl: './view-part.component.html',
  styleUrls: ['./view-part.component.scss']
})
export class ViewPartComponent {
  form: FormGroup = this.fb.group({
  
    firstname: [{ value: '',readonly: true }  ],
      lastname: [{ value: '', readonly: true }],
      gender:[{ value: '', readonly: true }],
      age: [{ value: '', readonly: true }],
      bmi:[{ value: '', readonly: true }],
      work:[{ value: '', readonly: true }],
      residency:[{ value: '', readonly: true }],
      averageGlucoseLevel: [{ value: '', readonly: true }],
      hypertension: [{ value: false, readonly: true }],
      heartDisease:[{ value: false, readonly: true }],
      married: [{ value: false, readonly: true }],
      smoke: [{ value: false, readonly: true }],
   
 

  });

  patient:Patient;
  
  constructor(private patientsService: PatientsService,private fb: FormBuilder, private dialogRef: MatDialogRef<ViewPartComponent>, @Inject(MAT_DIALOG_DATA) public data: { patient: Patient}) {
    
  }


  ngOnInit(): void {
   
    this.form = this.fb.group({
      firstname: [{ value: '',readonly: true }  ],
      lastname: [{ value: '', readonly: true }],
      gender:[{ value: '', readonly: true }],
      age: [{ value: '', readonly: true }],
      bmi:[{ value: '', readonly: true }],
      work:[{ value: '', readonly: true }],
      residency:[{ value: '', readonly: true }],
      averageGlucoseLevel: [{ value: '', readonly: true }],
      hypertension: [{ value: false, readonly: true }],
      heartDisease:[{ value: false, readonly: true }],
      married: [{ value: false, readonly: true }],
      smoke: [{ value: false, readonly: true }],
     
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
  doNothing()
  {
    return false
  }

}
