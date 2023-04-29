import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Case } from 'src/app/model/case';

@Injectable({
  providedIn: 'root'
})
export class CasesService {

  private dbPath = '/cases';

  casesRef: AngularFirestoreCollection<Case>;

  constructor(
    private db: AngularFirestore
  ) {
    this.casesRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Case> {
    return this.casesRef;
  }

  getOne(uid: string): AngularFirestoreDocument<Case> {
    return this.casesRef.doc(uid);
  }

  create(data: Case): any {
    return this.casesRef.add({ ...data });
  }

  update(id: string, data: any): Promise<void> {
    return this.casesRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.casesRef.doc(id).delete();
  }
}
