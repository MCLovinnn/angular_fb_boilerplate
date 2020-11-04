import { TestBed } from '@angular/core/testing';

import { DataFlattnerService } from './data-flattner.service';

describe('DataFlattnerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataFlattnerService = TestBed.get(DataFlattnerService);
    expect(service).toBeTruthy();
  });
});
