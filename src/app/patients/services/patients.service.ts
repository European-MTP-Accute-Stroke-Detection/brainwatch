import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Patient } from 'src/app/model/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private dbPath = '/patients';

  patientsRef: AngularFirestoreCollection<Patient>;

  currentUser: AngularFirestoreDocument<Patient>;

  constructor(
    private db: AngularFirestore
  ) {
    this.patientsRef = db.collection(this.dbPath);
    const user = JSON.parse(localStorage.getItem('user')!);
    this.currentUser = this.patientsRef.doc(user.uid);
  }

  getAll(): AngularFirestoreCollection<Patient> {
    return this.patientsRef;
  }

  getOne(uid: string): AngularFirestoreDocument<Patient> {
    return this.patientsRef.doc(uid);
  }

  create(user: Patient): any {
    return this.patientsRef.add({ ...user });
  }

  update(id: string, data: any): Promise<void> {
    return this.patientsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.patientsRef.doc(id).delete();
  }
}
