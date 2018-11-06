import { TestBed, inject } from '@angular/core/testing';

import { StorageSessionService } from './storage-session.service';

describe('StorageSessionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageSessionService]
    });
  });

  it('should be created', inject([StorageSessionService], (service: StorageSessionService) => {
    expect(service).toBeTruthy();
  }));
});
