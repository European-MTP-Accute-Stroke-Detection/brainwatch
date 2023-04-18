import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewPredictionComponent } from '../../../dwv/new-prediction/new-prediction.component';
import { RequestService } from '../../../dwv/services/request.service';

@Component({
  selector: 'app-tabular-ai',
  templateUrl: './tabular-ai.component.html',
  styleUrls: ['./tabular-ai.component.scss']
})
export class TabularAiComponent {

  constructor(
    public dialog: MatDialog,
    private requestService: RequestService
  ) {}
  
  async strokePrediction() {
    this.dialog.open(NewPredictionComponent, {
      width: '90vw',
      height: '92vh',
    });
  }
}
