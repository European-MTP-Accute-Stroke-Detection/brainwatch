import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestService } from '../../../dwv/services/request.service';
import { FileService } from '../../../shared/services/file.service';

@Component({
  selector: 'app-ai-models',
  templateUrl: './ai-models.component.html',
  styleUrls: ['./ai-models.component.scss']
})
export class AiModelsComponent {

  constructor(
    public dialog: MatDialog,
    private requestService: RequestService,
    private fileService: FileService
  ) { }

  aiModels: any[] = [
    { value: 'combined', viewValue: 'All Stroke Types TF' },
    { value: 'hemorrhage', viewValue: 'Hemorrhage Stroke TF' },
    { value: 'ischemic', viewValue: 'Ischemic Stroke TF' },
    { value: 'torch', viewValue: 'All Stoke Types Torch' },
  ];

  explainableAiModels: any[] = [
    { value: 'lime', viewValue: 'Lime' },
    { value: 'shap', viewValue: 'Grad-CAM' },

  ];

  explainableAIComplexities: any[] = [
    { value: 'low', viewValue: 'low' },
    { value: 'medium', viewValue: 'medium' },
    { value: 'high', viewValue: 'high' }
  ]

  modelRunning: boolean = false;
  xaiRunning: boolean = false;

  get selectedFiles() {
    return this.fileService.selectedFiles;
  }

  selectedModel: string;
  selectedExplainableAi: string;
  selectedComplexity: string;
  panelOpenState: boolean;

  async runPrediction() {
    if (this.selectedFiles.length == 1) {
      this.modelRunning = true;
      const file = this.selectedFiles[0];
      const formData = new FormData();
      formData.append("file", file);
      const prediction$ = this.requestService.predict(formData, this.selectedModel).toPromise();
      const result = await prediction$;
      this.modelRunning = false;
    }
  }

  async runExplanation() {
    if (this.selectedFiles.length == 1) {
      this.xaiRunning = true;
      const file = this.selectedFiles[0];
      const formData = new FormData();
      formData.append("file", file);
      const prediction$ = this.requestService.explain(formData, this.selectedModel, this.selectedExplainableAi, this.selectedComplexity).toPromise();
      const result = await prediction$;
      this.xaiRunning = false;
    }
  }

  async runPredictionSimple() {
    if (this.selectedFiles.length == 1) {
      this.modelRunning = true;
      const file = this.selectedFiles[0];
      const formData = new FormData();
      formData.append("file", file);
      const prediction$ = this.requestService.predict_simple(formData).toPromise();
      const result = await prediction$;
      // this.dialog.open(PredictionResultComponent, {
      //   width: '90vw',
      //   height: '92vh',
      //   data: {
      //     predictionId: result.predictionId
      //   }
      // });
      this.modelRunning = false;
    }
  }

  async runExplanationSimple() {
    if (this.selectedFiles.length == 1) {
      this.xaiRunning = true;
      const file = this.selectedFiles[0];
      const formData = new FormData();
      formData.append("file", file);
      const prediction$ = this.requestService.explain_simple(formData).toPromise();
      const result = await prediction$;
      // this.dialog.open(PredictionResultComponent, {
      //   width: '90vw',
      //   height: '92vh',
      //   data: {
      //     predictionId: result.predictionId
      //   }
      // });
      this.xaiRunning = false;
    }
  }


}
