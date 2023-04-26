import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { Patient } from '../../../model/patient';
import { Case } from '../../../model/case';
import { Observable, flatMap, map, skip } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/auth/services/user.service';
import firebase from 'firebase/compat';
import { User } from 'src/app/model/user';
import { MatActionList } from '@angular/material/list';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  @ViewChild('menuButtons') actionList: MatActionList;

  patients: Patient[];

  menuItems = [
    {
      icon: 'dashboard',
      title: 'Dashboard',
      link: '/dashboard',
      isFocussed: true
    },
    {
      icon: 'clinical_notes',
      title: 'Cases',
      link: '/cases'
    },
    {
      icon: 'group',
      title: 'Patients',
      link: '/patients'
    },
    {
      icon: 'table_chart',
      title: 'Tabular AI',
      link: 'tabularai'
    }
  ]

  constructor(
    public db: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public userService: UserService
  ) {
  }

  ngOnInit(): void {
    // Create a reference to the specific document you want to search with
    var user = this.userService.currentUser;
    this.db.collection<Patient>('patients', ref => ref.where("user", "==", user.ref))
      .valueChanges({ idField: 'uid' })
      // .pipe(
      //   map(changes =>
      //     changes.map(c =>
      //       ({ id: c.payload.doc.id, ...c.payload.doc.data() })
      //     )
      //   )
      // )
      .subscribe(data => {
        data.forEach(patient => this.getCases(patient))
        this.patients = data;
      });
  }

  async getCases(patient: Patient) {
    console.log(patient.uid)
    this.db.collection('patients').doc(patient.uid).collection<Case>('cases')
      .valueChanges({ idField: 'uid' })
      .subscribe(data => {
        patient.cases = data;
      });
  }





  folders: any[] = [
    {
      name: 'Case #123342',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];
}
