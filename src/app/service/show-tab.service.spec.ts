import { TestBed } from '@angular/core/testing';

import { ShowTabService } from './show-tab.service';

describe('ShowTabService', () => {
  let service: ShowTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
