import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  selectedFiles: FileList;

  constructor() { }
}
