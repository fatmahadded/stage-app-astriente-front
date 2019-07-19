import { TestBed } from '@angular/core/testing';

import { AstreinteService } from './astreinte.service';

describe('AstreinteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AstreinteService = TestBed.get(AstreinteService);
    expect(service).toBeTruthy();
  });
});
