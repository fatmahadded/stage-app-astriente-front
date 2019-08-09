import { TestBed } from '@angular/core/testing';

import { GetRapportService } from './get-rapport.service';

describe('GetRapportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetRapportService = TestBed.get(GetRapportService);
    expect(service).toBeTruthy();
  });
});
