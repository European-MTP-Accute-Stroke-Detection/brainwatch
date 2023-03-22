import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  baseUrl = "http://localhost:8080"

  constructor(
    private http: HttpClient
  ) { }

  predict(body: any, model: string): Observable<any> {
    return this.http.post<any>(    
      this.baseUrl + '/'+ model + '/predict',
      body
    );
  }

  predictStroke(body: any): Observable<any> {
    return this.http.post<any>(    
      'https://stroke-detection-380821.ew.r.appspot.com/tabular/predict',
      body
    );
  }
}
