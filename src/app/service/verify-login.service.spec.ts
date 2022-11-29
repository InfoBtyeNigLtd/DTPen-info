import { TestBed } from '@angular/core/testing';

import { VerifyLoginService } from './verify-login.service';

describe('VerifyLoginService', () => {
  let service: VerifyLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
