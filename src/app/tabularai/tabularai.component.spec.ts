import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabularaiComponent } from './tabularai.component';

describe('TabularaiComponent', () => {
  let component: TabularaiComponent;
  let fixture: ComponentFixture<TabularaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabularaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabularaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
