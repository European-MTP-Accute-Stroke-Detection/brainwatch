import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { UserService } from 'src/app/auth/services/user.service';
import { User } from 'src/app/model/user';
import { CasesService } from 'src/app/cases/services/cases.service';
import { Case } from 'src/app/model/case';
import { Scan } from '../../model/scan';

@Injectable({
  providedIn: 'root'
})
export class ScansService {
  [x: string]: any;

  private dbPath = '/scans';

  scansRef: AngularFirestoreCollection<Scan>;
  currentUser: AngularFirestoreDocument<User>;

  constructor(
    private db: AngularFirestore,
    private userService: UserService,
    private casesService: CasesService
  ) {
    const user: User = JSON.parse(localStorage.getItem('user')!);
    this.currentUser = this.userService.getOne(user.uid);
  }

  getAll(cs: DocumentReference<Case>) {
    return cs.collection(this.dbPath).get();
  }

  getOne(cs: DocumentReference<Case>, uid: string) {
    return cs.collection(this.dbPath).doc(uid).get();
  }

  create(cs: DocumentReference<Case>, scan: Scan) {
    return cs.collection(this.dbPath).add(scan);
  }

  async createMultiple(cs: DocumentReference<Case>, scans: Scan[]) {
    const result: DocumentReference[] = [];
    for (let scan of scans) {
      result.push(await this.create(cs, scan));
    }
    return result;
  }

  update(cs: AngularFirestoreDocument<Case>, id: string, scan: Scan): Promise<void> {
    return cs.collection(this.dbPath).doc(id).update(scan);
  }

  delete(cs: AngularFirestoreDocument<Case>, id: string): Promise<void> {
    return cs.collection(this.dbPath).doc(id).delete();
  }

}
