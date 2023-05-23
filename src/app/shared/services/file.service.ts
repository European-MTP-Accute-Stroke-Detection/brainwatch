import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  selectedFiles: FileList;

  constructor(
    private fbStorage: AngularFireStorage,
  ) { }

  upload(caseId: string, scanId: string, file: any): Promise<any> {
    const path = `Cases/${caseId}/scans/${scanId}.dcm`;
    const fileRef = this.fbStorage.ref(path);

    return new Promise<any>((resolve, reject) => {
      const task = this.fbStorage.upload(path, file);

      task.snapshotChanges().pipe(
        finalize(() => fileRef.getDownloadURL().subscribe(
          res => resolve(res),
          err => reject(err))
        )
      ).subscribe();
    });
  }
}
