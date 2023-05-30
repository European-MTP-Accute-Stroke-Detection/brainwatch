import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  baseUrl = "http://localhost:8080"

  constructor(
    private http: HttpClient
  ) { }

  predict(body: any, model: string): Observable<any> {
    console.log(this.baseUrl + '/'+ model +'/explain');
    return this.http.post<any>(    
      this.baseUrl + '/'+ model + '/predict',
      body
    );
  }
  explain(body: any, model: string, explanation: string, complexity: string): Observable<any> {
    console.log(this.baseUrl + '/'+ model +'/explain/'+ explanation);
    return this.http.post<any>(    
      this.baseUrl + '/'+ model +'/explain/'+ explanation +'_' + complexity,
      body
    );
  }

  predict_simple(body: any, uid:string): Observable<any> {
    return this.http.post<any>(    
      this.baseUrl + '/predict_complete/'+uid,
      body
      );
  }
  explain_simple(body: any, uid:string): Observable<any> {
    return this.http.post<any>(    
      this.baseUrl + '/explain_complete/'+uid,
      body
    );
  }

  predictStroke(body: any): Observable<any> {
    return this.http.post<any>(    
      this.baseUrl + '/tabular/predict',
      body
    );
  }
}

