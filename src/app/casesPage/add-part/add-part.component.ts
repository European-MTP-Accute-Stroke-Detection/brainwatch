import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-add-part',
  templateUrl: './add-part.component.html',
  styleUrls: ['./add-part.component.scss']
})
export class AddPartComponent {
  constructor(private dialogRef: MatDialogRef<AddPartComponent>,private dialog: MatDialog){}
  exit(){   
    this.dialogRef.close();
  }
}
