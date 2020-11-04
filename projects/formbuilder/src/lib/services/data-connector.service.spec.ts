import { TestBed } from '@angular/core/testing';

import { DataConnectorService } from './data-connector.service';

describe('DataConnectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataConnectorService = TestBed.get(DataConnectorService);
    expect(service).toBeTruthy();
  });
});
