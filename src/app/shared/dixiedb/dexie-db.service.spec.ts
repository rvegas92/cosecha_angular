import { TestBed } from '@angular/core/testing';

import { DexieService } from '../dixiedb/dexie-db.service';

describe('DexieDBService', () => {
  let service: DexieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DexieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
