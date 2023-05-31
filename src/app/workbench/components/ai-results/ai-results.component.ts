import { Component, OnInit } from '@angular/core';
import { Scan } from 'src/app/model/scan';
import { DicomsService } from '../../services/dicoms.service';

@Component({
  selector: 'app-ai-results',
  templateUrl: './ai-results.component.html',
  styleUrls: ['./ai-results.component.scss']
})
export class AiResultsComponent implements OnInit {

  constructor(
    private dicomsService: DicomsService
  ) { }


  currentScan: Scan;

  ngOnInit(): void {
    this.dicomsService.currentScan$.subscribe((scan) => {
      this.currentScan = scan;
    })
  }



}
