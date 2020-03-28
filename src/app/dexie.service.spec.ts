import { TestBed } from '@angular/core/testing';

import { DexieService } from './dexie.service';

describe('DexieService', () => {
  let service: DexieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DexieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
