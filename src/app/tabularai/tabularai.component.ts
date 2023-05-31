import { Component } from '@angular/core';
import { RequestService } from '../dwv/services/request.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { PatientsService } from '../patients/services/patients.service';
import { Patient } from '../model/patient';
import { MatSelectChange } from '@angular/material/select';
import { TabularaiService } from './services/tabularai.service';
import { TabularPredictionResult } from '../model/tabular-prediction';

@Component({
  selector: 'app-tabularai',
  templateUrl: './tabularai.component.html',
  styleUrls: ['./tabularai.component.scss']
})
export class TabularaiComponent {
  constructor(
    private requestService: RequestService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private patientsService: PatientsService,
    private tabularaiService: TabularaiService
  ) { }

  patientId: string;
  showInputs: boolean;
  predictionResult: TabularPredictionResult;
  loadingPred: boolean;
  predictionHtml: string;
  strokeMessage: string;

  showDetails: boolean = false;

  genders = [
    {
      key: 'Male',
      val: 'male'
    },
    {
      key: 'Female',
      val: 'female'
    },
    {
      key: 'Other',
      val: 'other'
    },
  ]

  imagePath1: any;
  imagePath2: any;

  patients: Patient[];

  prediction = {
    gender: '',
    age: null,
    hypertension: null,
    heart_disease: null,
    ever_married: null,
    work_type: "",
    Residence_type: "",
    avg_glucose_level: null,
    bmi: null,
    smoking_status: null
  }

  async ngOnInit(): Promise<void> {
    this.patientsService.getAll().valueChanges({ idField: 'uid' }).subscribe((data: Patient[]) => {
      this.patients = data;
    });
  }

  patientSelected($event: MatSelectChange) {
    const patient = $event.value as Patient;
    this.prediction = {
      ...this.prediction,
      gender: patient.gender,
      age: patient.age,
      hypertension: patient.hypertension ? 'True' : 'False',
      heart_disease: patient.heartDisease ? 'True' : 'False',
      ever_married: patient.married ? 'Yes' : 'No',
      work_type: patient.work,
      Residence_type: patient.residency == 'rural' ? 'Rural' : 'Urban',
      avg_glucose_level: patient.averageGlucoseLevel,
      bmi: patient.bmi,
      smoking_status: patient.smoke ? 'formely smoked' : 'never smoked',
    }
  }

  async predict() {

    this.loadingPred = true;

    const body = {
      gender: [this.prediction.gender],
      age: [this.prediction.age],
      hypertension: [this.prediction.hypertension == 'False' ? 0 : 1],
      heart_disease: [this.prediction.heart_disease == 'False' ? 0 : 1],
      ever_married: [this.prediction.ever_married],
      work_type: [this.prediction.work_type],
      Residence_type: [this.prediction.Residence_type],
      avg_glucose_level: [this.prediction.avg_glucose_level],
      bmi: [this.prediction.bmi],
      smoking_status: [this.prediction.smoking_status]
    }

    this.predictionResult = (await this.tabularaiService.predict(body))[0];

    console.log(this.predictionResult);

    if (this.predictionResult.result == 0) {
      this.strokeMessage = 'No accute stroke risk detected. Perform further examination for more information.'
    }
    else {
      this.strokeMessage = 'Potential stroke detected. Send out Mobile Stroke Unit !'
    }

    this.loadingPred = false;

  }

  resetPrediction() {
    this.showDetails = false;
    this.predictionResult = null;
  }
}
