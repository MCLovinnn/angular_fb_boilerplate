import { TestBed } from '@angular/core/testing';

import { FormularService } from './formular.service';

describe('FormularService', () => {
  let service: FormularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
