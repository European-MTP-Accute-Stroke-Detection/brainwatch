import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {CasesService} from './services/cases.service'
import { PatientsService } from '../patients/services/patients.service';
import { Patient } from '../model/patient';
import { AddPartComponent } from '../casesPage/add-part/add-part.component';
import { MatDialog } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
import { Reference } from "@angular/fire/compat/storage/interfaces";
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Case } from '../model/case';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { DeleteCardComponent } from './components/delete-card/delete-card.component';
import { EditPartComponent } from './components/edit-part/edit-part.component';
import { ViewPartComponent } from './components/view-part/view-part.component';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent {
  casesfromDB: Case[] = [];  

  dataSource :any;
  
  constructor(private router: Router,private casesService: CasesService,private dialog: MatDialog){}
  ngOnInit(): void {
    this.dataSource= new MatTableDataSource<Case>(this.casesfromDB);
    this.casesService.getAll().valueChanges().subscribe((data: Case[]) => {
      this.casesfromDB = data;
      this.dataSource.data = data;
    });
    
    
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  
  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
  }
  
   
   
   
    addCase(){
      
     const dialogRef = this.dialog.open(PopUpComponent);
      
  
    }
    deleteSafe(cases:Case)
    {
      
     const dialogRef = this.dialog.open(DeleteCardComponent, {
        data: { cases }
      });
    }
  
    editCase(patient:Patient) {
      const dialogRef = this.dialog.open(EditPartComponent, {
        data: { patient }
      });
      
        
    }
    viewCase(patient:Patient)
    {
      const dialogRef = this.dialog.open(ViewPartComponent, {
        data: { patient  }
      });
      
    }
   
 
   

  
}
