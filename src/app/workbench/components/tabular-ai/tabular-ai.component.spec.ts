import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabularAiComponent } from './tabular-ai.component';

describe('TabularAiComponent', () => {
  let component: TabularAiComponent;
  let fixture: ComponentFixture<TabularAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabularAiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabularAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
