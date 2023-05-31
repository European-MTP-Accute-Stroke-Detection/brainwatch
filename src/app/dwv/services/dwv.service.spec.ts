import { TestBed } from '@angular/core/testing';

import { DwvService } from './dwv.service';

describe('DwvService', () => {
  let service: DwvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DwvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
