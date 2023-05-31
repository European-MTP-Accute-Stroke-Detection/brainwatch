import { TestBed } from '@angular/core/testing';

import { TabularaiService } from './tabularai.service';

describe('TabularaiService', () => {
  let service: TabularaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabularaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
