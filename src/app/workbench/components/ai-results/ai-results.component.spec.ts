import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiResultsComponent } from './ai-results.component';

describe('AiResultsComponent', () => {
  let component: AiResultsComponent;
  let fixture: ComponentFixture<AiResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
