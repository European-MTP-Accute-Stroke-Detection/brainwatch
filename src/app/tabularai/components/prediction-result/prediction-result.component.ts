import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-prediction-result',
  templateUrl: './prediction-result.component.html',
  styleUrls: ['./prediction-result.component.scss']
})
export class PredictionResultComponent {

  result: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { predictionId: string },
    private domSanitizer: DomSanitizer,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    this.result = await this.getJSON().toPromise()
  }

  cleanURL(oldURL: string): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(oldURL);
  }

  public getJSON(): Observable<any> {
    return this.http.get('http://localhost:8080/static/' + this.data.predictionId + '/result.json');
  }
}
