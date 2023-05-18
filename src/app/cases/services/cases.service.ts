import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Case } from 'src/app/model/case';
import { Patient } from 'src/app/model/patient';

@Injectable({
  providedIn: 'root'
})
export class CasesService {

  private dbPath = '/cases';

  casesRef: AngularFirestoreCollection<Case>;

  currentUser: AngularFirestoreDocument<Case>;

  constructor(
    private db: AngularFirestore
  ) {
    this.casesRef = db.collection(this.dbPath);
    const user = JSON.parse(localStorage.getItem('user')!);
    this.currentUser = this.casesRef.doc(user.uid);
  }

  getAll(): AngularFirestoreCollection<Case> {
    return this.casesRef;
  }

  getOne(uid: string): AngularFirestoreDocument<Case> {
    return this.casesRef.doc(uid);
  }

  create(user: Case): any {
    const userUid = JSON.parse(localStorage.getItem('user')!)?.uid;
    const caseId = this.generateFirebaseId();
    const caseWithUserId = { ...user, userId: userUid ,uid: caseId};
    
    this.casesRef.doc(caseId).set(caseWithUserId);
    
   // this.casesRef.doc(uid).set(user);

   // return this.casesRef.add({ ...user });
  }

  update(id: string, data: any): Promise<void> {
    return this.casesRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.casesRef.doc(id).delete();
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
      ref.where('user', '==', userId)
    );
  }
}
