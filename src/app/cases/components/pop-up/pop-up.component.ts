import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CasesService } from '../../services/cases.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Patient } from 'src/app/model/patient';
import { MatTableDataSource } from '@angular/material/table';
import { PatientsService } from 'src/app/patients/services/patients.service';
import { Router } from '@angular/router';
import { Reference } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileService } from 'src/app/shared/services/file.service';
import { ScansService } from 'src/app/scans/services/scans.service';
import * as dicomParser from 'dicom-parser';


@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {
  patientsfromDB: Patient[] = [];
  selectedPatient: Reference<Patient>;
  selectedTime: Date;

  uploading: boolean = false;

  dataSource: any;// new MatTableDataSource<Patient>(this.patientsfromDB);
  form: FormGroup = new FormGroup({});

  dicomFiles: any[] = [];
  dicomFilesMetadata: any[] = [];

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private casesService: CasesService,
    private patientsService: PatientsService,
    private fb: FormBuilder,
    private fileService: FileService,
    private scansService: ScansService,
    private dialogRef: MatDialogRef<PopUpComponent>
  ) { 
    this.selectedTime = new Date();
  }

  ngOnInit(): void {
    this.initializeForm();
    this.patientsService.getAll().valueChanges({ idField: 'uid' }).subscribe((data: Patient[]) => {
      this.patientsfromDB = data;
    });

  }

  initializeForm() {
    this.form = this.fb.group({
      date: ['', Validators.required],
      notes: [''],
      patient: [null],
      file: [null]
    });
  }

  close() {
    this.dialogRef.close();
  }

  async submit() {
    if (this.form.valid) {
      this.uploading = true;
      this.dialogRef.disableClose = true;
      // Save Case Data
      const cs_ref = await this.casesService.create({ ...this.form.value });
      // Save Scan Data
      const scans_result = await this.scansService.createMultiple(
        cs_ref,
        this.dicomFilesMetadata
      )
      // Store Scans in Storage
      for (let [index, scanRes] of scans_result.entries()) {
        await this.fileService.upload(cs_ref.id, scanRes.id, this.dicomFiles[index]);
      }
      this.openSnackBar();
      this.dialogRef.close();
    }
  }

  getDicomScansMetaData(): void {
    this.dicomFilesMetadata = [];
    for (let file of this.dicomFiles) {
      const fileReader: FileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const arrayBuffer: ArrayBuffer = e.target.result;
        const byteArray: Uint8Array = new Uint8Array(arrayBuffer);

        // Parse the DICOM tags
        const dataSet: dicomParser.DataSet = dicomParser.parseDicom(byteArray);

        console.log(dataSet.string('x00080018'))

        this.dicomFilesMetadata.push({
          dicom_uid: dataSet.string('x00080018')
        })
        // Print DICOM tags
        // console.log(`DICOM Tags for File ${i + 1}:`);
        // for (const tag in dataSet.elements) {
        //   if (dataSet.elements.hasOwnProperty(tag)) {
        //     console.log(`${tag}: ${dataSet.string(tag)}`);
        //   }
        // }
      };
      fileReader.readAsArrayBuffer(file);
    }
  }

  openSnackBar() {
    this._snackBar.open('Case added successfully!', 'Close', {
      duration: 3000, // Set the duration for how long the snackbar should be visible

    });
  }

  onFileChange($event: any) {
    this.dicomFiles = [];
    for (var i = 0; i < $event.target.files.length; i++) {
      this.dicomFiles.push($event.target.files[i]);
    }
    this.getDicomScansMetaData()
  }
}
