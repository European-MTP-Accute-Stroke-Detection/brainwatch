import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TabularaiService {

  constructor(
    private http: HttpClient
  ) { }

  predict(body: any): Promise<any> {
    return new Promise(function (resolve) {
      setTimeout(() => {
        resolve(
          {
            hypertension: 1.0863704866,
            bmi: -1.0004404604,
            age: -0.9670271919,
            Residence_type: 0.227119398,
            work_type: 0.1808062429,
            heart_disease: 0.1588137608,
            ever_married: 0.1124606959,
            gender: 0.1111783168,
            smoking_status: 0.0584052403,
            avg_glucose_level: 0.0318080812,
            result: 1,
            probability_stroke: 0.9710097104,
            probability_no_stroke: 0.0289902896
          }
        )
      }, 500);
    });
  }

}
