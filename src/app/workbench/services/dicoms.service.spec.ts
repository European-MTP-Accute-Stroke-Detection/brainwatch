import { TestBed } from '@angular/core/testing';

import { DicomsService } from './dicoms.service';

describe('DicomsService', () => {
  let service: DicomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DicomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
