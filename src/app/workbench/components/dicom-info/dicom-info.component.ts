import { Component, OnInit } from '@angular/core';
import { DicomsService } from '../../services/dicoms.service';
import { DicomInfo } from '../../../model/dicom-info';

@Component({
  selector: 'app-dicom-info',
  templateUrl: './dicom-info.component.html',
  styleUrls: ['./dicom-info.component.scss']
})
export class DicomInfoComponent implements OnInit {

  dicomInfo: DicomInfo;
  currentIndex: string;

  constructor(
    public dicomService: DicomsService
  ) {

  }

  ngOnInit(): void {
    this.dicomService.currentIndex$.subscribe(index => {
      this.dicomInfo = this.dicomService.metadata;
      this.currentIndex = String(index + 1);
    });
  }
}
