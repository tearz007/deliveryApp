import { TestBed } from '@angular/core/testing';

import { CoodinateService } from './coodinate.service';

describe('CoodinateService', () => {
  let service: CoodinateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoodinateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
