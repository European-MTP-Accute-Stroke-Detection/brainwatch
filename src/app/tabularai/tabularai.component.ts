import { Component } from '@angular/core';
import { RequestService } from '../dwv/services/request.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

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
    private _sanitizer: DomSanitizer
  ) { }

  patient: any;
  patientId: string;
  showInputs: boolean;
  predictionResult: any;
  loadingPred: boolean;
  predictionHtml: string;
  strokeMessage: string;

  imagePath1: any;
  imagePath2: any;

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
    this.predictionResult = {};
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

    this.predictionResult = await this.requestService.predictStroke(body).toPromise();

    if (this.predictionResult.result == 0) {
      this.strokeMessage = 'No accute stroke risk detected. Perform further examination for more information.'
    }
    else {
      this.strokeMessage = 'Potential stroke detected. Send out Mobile Stroke Unit !'
    }

    this.loadingPred = false;

  }
}
