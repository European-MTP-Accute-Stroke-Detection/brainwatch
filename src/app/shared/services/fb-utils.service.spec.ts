import { TestBed } from '@angular/core/testing';

import { FbUtilsService } from './fb-utils.service';

describe('FbUtilsService', () => {
  let service: FbUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
