import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPredictionComponent } from './new-prediction.component';

describe('NewPredictionComponent', () => {
  let component: NewPredictionComponent;
  let fixture: ComponentFixture<NewPredictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPredictionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
