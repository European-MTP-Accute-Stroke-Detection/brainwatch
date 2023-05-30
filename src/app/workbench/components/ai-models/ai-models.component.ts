import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestService } from '../../../dwv/services/request.service';
import { FileService } from '../../../shared/services/file.service';
import { Case } from 'src/app/model/case';

@Component({
  selector: 'app-ai-models',
  templateUrl: './ai-models.component.html',
  styleUrls: ['./ai-models.component.scss']
})
export class AiModelsComponent {

  @Input('case') case: Case;

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
    this.modelRunning = true;
    const formData = new FormData();
    formData.append("case", 'case');
    const prediction$ = this.requestService.predict_simple(formData, this.case.uid).toPromise();
    const result = await prediction$;
    this.modelRunning = false;
}

async runExplanationSimple() {
    this.xaiRunning = true;
    const formData = new FormData();
    formData.append("case", 'case');
    const prediction$ = this.requestService.explain_simple(formData, this.case.uid).toPromise();
    const result = await prediction$;
    this.xaiRunning = false;
  
}


}
