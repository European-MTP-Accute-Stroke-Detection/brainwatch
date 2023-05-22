import { Component, ViewChild } from '@angular/core';
import { CasesService } from './services/cases.service'
import { MatDialog } from '@angular/material/dialog';
import { Case } from '../model/case';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { DeleteCardComponent } from './components/delete-card/delete-card.component';
import { EditPartComponent } from './components/edit-part/edit-part.component';
import { ViewPartComponent } from './components/view-part/view-part.component';
import { PatientsService } from '../patients/services/patients.service';


@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent {

  casesfromDB: Case[] = [];
  loading: boolean = true;
  dataSource: any;

  constructor(
    private casesService: CasesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    
    this.dataSource = new MatTableDataSource<Case>(this.casesfromDB);
    this.casesService.getAll().valueChanges({ idField: 'uid' }).subscribe(async (data: Case[]) => {
      for (let cases of data) {
        if (cases.patientRef) {
          cases.patient = {
            uid: cases.patientRef.id,
            ...(await cases.patientRef.get()).data(),
          }
        }
      }
      
      this.casesfromDB = data;
      this.dataSource.data = data;
      this.loading = false; 
     
    });
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  addCase() {
    const dialogRef = this.dialog.open(PopUpComponent);
  }

  deleteSafe(cases: Case) {
    const dialogRef = this.dialog.open(DeleteCardComponent, {
      data: { cases }
    });
  }

  editCase(cases: Case) {
    const dialogRef = this.dialog.open(EditPartComponent, {
      data: { cases }
    });
  }

  viewCase(cases: Case) {
    const dialogRef = this.dialog.open(ViewPartComponent, {
      data: { cases }
    });

  }
}
