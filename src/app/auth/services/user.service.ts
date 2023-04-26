import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/users';

  usersRef: AngularFirestoreCollection<User>;

  currentUser: AngularFirestoreDocument<User>;

  constructor(
    private db: AngularFirestore
  ) {
    this.usersRef = db.collection(this.dbPath);
    const user = JSON.parse(localStorage.getItem('user')!);
    this.currentUser = this.usersRef.doc(user.uid);
  }

  getAll(): AngularFirestoreCollection<User> {
    return this.usersRef;
  }

  getOne(uid: string): AngularFirestoreDocument<User> {
    return this.usersRef.doc(uid);
  }

  create(user: User): any {
    return this.usersRef.add({ ...user });
  }

  update(id: string, data: any): Promise<void> {
    return this.usersRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.usersRef.doc(id).delete();
  }
}
