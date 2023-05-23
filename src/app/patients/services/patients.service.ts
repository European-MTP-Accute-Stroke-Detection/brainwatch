import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, Reference } from '@angular/fire/compat/firestore';
import { UserService } from 'src/app/auth/services/user.service';
import { Patient } from 'src/app/model/patient';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private dbPath = '/patients';

  patientsRef: AngularFirestoreCollection<Patient>;

  currentUser: AngularFirestoreDocument<User>;

  constructor(
    private db: AngularFirestore,
    private userService: UserService
  ) {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.currentUser = this.userService.getOne(user.uid);
    this.patientsRef = db.collection(this.dbPath, ref => ref.where('userRef', '==', this.currentUser.ref));
  }

  getAll(): AngularFirestoreCollection<Patient> {
    return this.patientsRef;
  }

  getOne(uid: string): AngularFirestoreDocument<Patient> {
    return this.patientsRef.doc(uid);
  }

  create(patient: Patient) {
    patient = {
      ...patient,
      userRef: this.currentUser.ref
    };
    return this.patientsRef.add(patient);
  }

  update(id: string, data: Patient): Promise<void> {
    return this.patientsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.patientsRef.doc(id).delete();
  }

}
