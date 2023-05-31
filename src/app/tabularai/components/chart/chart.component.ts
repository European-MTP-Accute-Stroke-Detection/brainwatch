import { Component, Input, OnInit } from '@angular/core';
import { TabularPredictionResult } from '../../../model/tabular-prediction';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {



  @Input('data') data: TabularPredictionResult;

  multi: any[] = [];

  view: any[] = [null, 500];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Features';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Importance';

  ngOnInit(): void {
    this.multi = [
      {
        "name": "Age",
        "value": this.data.age
      },
      {
        "name": "Gender",
        "value": this.data.gender
      },
      {
        "name": "Hypertension",
        "value": this.data.hypertension
      },
      {
        "name": "Heart Disease",
        "value": this.data.heart_disease
      },
      {
        "name": "Ever Married",
        "value": this.data.ever_married
      },
      {
        "name": "Work Type",
        "value": this.data.work_type
      },
      {
        "name": "Residence Type",
        "value": this.data.Residence_type
      },
      {
        "name": "Avg. Glucose Level",
        "value": this.data.avg_glucose_level
      },
      {
        "name": "BMI",
        "value": this.data.bmi
      },
      {
        "name": "Smoking Status",
        "value": this.data.smoking_status
      },
    ];
  }


  onSelect(event) {
    console.log(event);
  }

}
