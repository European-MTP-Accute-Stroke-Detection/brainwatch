import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { UserService } from 'src/app/auth/services/user.service';
import { Case } from 'src/app/model/case';
import { Patient } from 'src/app/model/patient';
import { User } from 'src/app/model/user';
import { PatientsService } from 'src/app/patients/services/patients.service';

@Injectable({
  providedIn: 'root'
})
export class CasesService {

  private dbPath = '/cases';

  casesRef: AngularFirestoreCollection<Case>;
  currentUser: AngularFirestoreDocument<User>;

  constructor(
    private db: AngularFirestore,
    private userService: UserService,
    private patientsService: PatientsService
  ) {
    const user: User = JSON.parse(localStorage.getItem('user')!);
    this.currentUser = this.userService.getOne(user.uid);
    this.casesRef = db.collection(this.dbPath, ref => ref.where('userRef', '==', this.currentUser.ref));
  }

  getAll(): AngularFirestoreCollection<Case> {
    return this.casesRef;
  }

  getOne(uid: string): AngularFirestoreDocument<Case> {
    return this.casesRef.doc(uid);
  }

  create(cs: Case): void {
    cs = {
      ...cs,
      userRef: this.currentUser.ref,
      patientRef: this.patientsService.getOne(cs.patient.uid).ref
    };
    delete cs.patient;
    this.casesRef.ref.add(cs);
  }

  update(id: string, cs: Case): Promise<void> {
    cs = {
      ...cs,
      userRef: this.currentUser.ref,
      patientRef: this.patientsService.getOne(cs.patient?.uid).ref
    };
    delete cs.patient;
    return this.casesRef.doc(id).update(cs);
  }

  delete(id: string): Promise<void> {
    return this.casesRef.doc(id).delete();
  }
}
