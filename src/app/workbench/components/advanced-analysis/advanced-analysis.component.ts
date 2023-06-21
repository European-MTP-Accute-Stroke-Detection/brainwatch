import { Component, OnInit } from '@angular/core';
import { DwvService } from '../../../dwv/services/dwv.service';

@Component({
  selector: 'app-advanced-analysis',
  templateUrl: './advanced-analysis.component.html',
  styleUrls: ['./advanced-analysis.component.scss']
})
export class AdvancedAnalysisComponent implements OnInit {

  constructor(
    private dwvService: DwvService
  ) { }

  selectedWindow: string = 'Default';

  windows: string[] = [
    'Brain',
    'Mediastinum',
    'Subdural',
    'Bone',
    'Head'
  ];

  ngOnInit(): void {

  }

  windowSelected() {
    switch (this.selectedWindow) {
      case 'Brain':
        this.dwvService.setWindowLevel(40, 80);
        break;
      case 'Mediastinum':
        this.dwvService.setWindowLevel(40, 400);
        break;
      case 'Bone':
        this.dwvService.setWindowLevel(500, 2000);
        break;
      case 'Subdural':
        this.dwvService.setWindowLevel(60, 120);
        break;
      case 'Head':
        this.dwvService.setWindowLevel(90, 350);
        break;
    }
  }
}
