import { Component,OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientsService } from 'src/app/patients/services/patients.service';
import { UserService } from 'src/app/auth/services/user.service';
import { User} from '../../../model/user';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {

  form: FormGroup = this.fb.group({
   
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email:[''],
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
      cases : this.fb.array([])
   
 

  });
  
  constructor(private _snackBar: MatSnackBar,private patientsService: PatientsService,private fb: FormBuilder, private dialogRef: MatDialogRef<PopupComponent>) {}
  ngOnInit(): void {

   
    

    this.form= this.fb.group({
      
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email:[''],
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
      cases : this.fb.array([])
     
    });
  }
  close() {
    this.dialogRef.close();
  }

  submit() {
    if (this.form.valid) { 
    this.patientsService.create({ ...this.form.value}); 
    this.dialogRef.close();
      
    }
  }
  onUserSelected(uid:string){
    this.form.value.uid= uid; 
  }
  openSnackBar() {
    this._snackBar.open('Patient added successfully!', 'Close', {
      duration: 3000, // Set the duration for how long the snackbar should be visible
     
    });
  }
}
