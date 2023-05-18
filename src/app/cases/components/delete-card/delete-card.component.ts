import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Case } from 'src/app/model/case';
import { CasesService } from '../../services/cases.service';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-delete-card',
  templateUrl: './delete-card.component.html',
  styleUrls: ['./delete-card.component.scss']
})
export class DeleteCardComponent {
  case:Case;


  constructor(private _snackBar: MatSnackBar,private casesService:CasesService,private fb: FormBuilder, private dialogRef: MatDialogRef<DeleteCardComponent>, @Inject(MAT_DIALOG_DATA) public data: { case: Case }){}
  
  ngOnInit(): void {
    this.case = this.data.case;
  }

  deleteCase() {
    
    this.casesService.delete(this.case.uid);
    this.openSnackBar()
    this.dialogRef.close();
      
  }
  exit(){   
    this.dialogRef.close();
  }
  openSnackBar() {
    this._snackBar.open('Case deleted successfully!', 'Close', {
      duration: 3000, // Set the duration for how long the snackbar should be visible
     
    });
  }

}
