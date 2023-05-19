import { Component, OnInit } from '@angular/core';
import { PatientsService } from './services/patients.service';
import { Patient } from '../model/patient';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './components/popup/popup.component';
import { EditPartComponent } from './components/edit-part/edit-part.component';
import { DeleteCardComponent } from './components/delete-card/delete-card.component';
import { Router } from '@angular/router';


import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewPartComponent } from './components/view-part/view-part.component';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit, AfterViewInit {
  patientsfromDB: Patient[] = [];

  dataSource: any;// new MatTableDataSource<Patient>(this.patientsfromDB);



  constructor(private router: Router, private patientsService: PatientsService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Patient>(this.patientsfromDB);
    this.patientsService.getAll().valueChanges({ idField: 'uid' }).subscribe((data: Patient[]) => {
      this.patientsfromDB = data;
      this.dataSource.data = data;
    });


  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }




  addPatient() {

    const dialogRef = this.dialog.open(PopupComponent);


  }
  deleteSafe(patient: Patient) {
    const dialogRef = this.dialog.open(DeleteCardComponent, {
      data: { patient }
    });
  }

  editPatient(patient: Patient) {
    const dialogRef = this.dialog.open(EditPartComponent, {
      data: { patient }
    });


  }
  viewPatient(patient: Patient) {
    const dialogRef = this.dialog.open(ViewPartComponent, {
      data: { patient }
    });

  }
  filteredUsers: Patient[];
  searchText: string = '';

  search() {

    if (this.searchText == '') {
      this.dataSource = new MatTableDataSource<Patient>(this.patientsfromDB);
      this.dataSource.paginator = this.paginator;
      return;
    }
    else {
      this.filteredUsers = this.patientsfromDB.filter(user =>
        user.lastname.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.firstname.toLowerCase().includes(this.searchText.toLowerCase())
      );
      this.dataSource = new MatTableDataSource<Patient>(this.filteredUsers);
    }

  }
  goToCases(patient: Patient) {
    //console.log(patient);
    //this.router.navigate(['/cases'], { state: { data: patient } });

  }

}
