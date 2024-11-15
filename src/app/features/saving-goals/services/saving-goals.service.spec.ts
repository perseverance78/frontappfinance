import { TestBed } from '@angular/core/testing';

import { SavingGoalsService } from './saving-goals.service';

describe('SavingGoalsService', () => {
  let service: SavingGoalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavingGoalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
