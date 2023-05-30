import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient
  ) { }

  predict(body: any, model: string): Observable<any> {
    console.log(environment.baseUrl + '/' + model + '/explain');
    return this.http.post<any>(
      environment.baseUrl + '/' + model + '/predict',
      body
    );
  }

  explain(body: any, model: string, explanation: string, complexity: string): Observable<any> {
    console.log(environment.baseUrl + '/' + model + '/explain/' + explanation);
    return this.http.post<any>(
      environment.baseUrl + '/' + model + '/explain/' + explanation + '_' + complexity,
      body
    );
  }

  predict_simple(body: any): Observable<any> {
    return this.http.post<any>(
      environment.baseUrl + '/predict',
      body
    );
  }

  explain_simple(body: any): Observable<any> {
    return this.http.post<any>(
      environment.baseUrl + '/explain',
      body
    );
  }
}

