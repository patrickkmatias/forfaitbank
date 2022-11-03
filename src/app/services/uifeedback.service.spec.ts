import { TestBed } from '@angular/core/testing';

import { UIFeedbackService } from './uifeedback.service';

describe('UIFeedbackService', () => {
  let service: UIFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UIFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
