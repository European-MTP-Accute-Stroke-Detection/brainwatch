import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-new-prediction',
  templateUrl: './new-prediction.component.html',
  styleUrls: ['./new-prediction.component.scss']
})
export class NewPredictionComponent implements OnInit {

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

  prediction ={
    gender: 'Male',
    age: 30,
    hypertension: 'True',
    heart_disease: 'False',
    ever_married: "Yes",
    work_type: "Private",
    Residence_type: "Urban",
    avg_glucose_level: 228.69,
    bmi: 30,
    smoking_status: 'unknown'
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

    console.log(this.predictionResult);

    if(this.predictionResult.result == 0) {
      this.strokeMessage = 'No accute stroke risk detected. Perform further examination for more information.'
    }
    else {
      this.strokeMessage = 'Potential stroke detected. Send out Mobile Stroke Unit !'
    }

    this.loadingPred = false;

  }

}
