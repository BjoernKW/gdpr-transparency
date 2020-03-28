import { TestBed } from '@angular/core/testing';

import { ProcessingActivityService } from './processing-activity.service';

describe('ProcessingActivityService', () => {
  let service: ProcessingActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessingActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
