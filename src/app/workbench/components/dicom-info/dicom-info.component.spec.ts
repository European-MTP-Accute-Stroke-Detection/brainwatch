import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DicomInfoComponent } from './dicom-info.component';

describe('DicomInfoComponent', () => {
  let component: DicomInfoComponent;
  let fixture: ComponentFixture<DicomInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DicomInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DicomInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
