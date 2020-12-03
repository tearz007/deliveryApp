import { TestBed } from '@angular/core/testing';

import { UserInforService } from './user-infor.service';

describe('UserInforService', () => {
  let service: UserInforService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInforService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
