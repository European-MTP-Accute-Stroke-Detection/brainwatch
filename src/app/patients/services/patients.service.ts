import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, Reference } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';
import { Patient } from 'src/app/model/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  user: Reference<User>

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

  create(patient: Patient): any {
    const userUid = JSON.parse(localStorage.getItem('user')!)?.uid;
    const patientId = this.generateFirebaseId();
   
    const patientWithUserId = { ...patient, user: userUid ,uid: patientId};
    
    return this.patientsRef.doc(patientId).set(patientWithUserId);
    //return this.patientsRef.add({ ...patient });
  }

  update(id: string, data: any): Promise<void> {
    return this.patientsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.patientsRef.doc(id).delete();
  }
  generateFirebaseId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
  
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      id += chars.charAt(randomIndex);
    }
  
    return id;
  }
  getPatientsByUserId(): AngularFirestoreCollection<Patient> {
    const userId= JSON.parse(localStorage.getItem('user')!)?.uid;
    return this.db.collection(this.dbPath, (ref) =>
      ref.where('userId', '==', userId)
    );
  }
  
}
