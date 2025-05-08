import { TestBed } from '@angular/core/testing';

import { ChocolatService } from './chocolat.service';

describe('ChocolatService', () => {
  let service: ChocolatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChocolatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
