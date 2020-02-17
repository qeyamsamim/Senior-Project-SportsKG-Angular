import { TestBed } from '@angular/core/testing';

import { OtherSportClubsService } from './other-sport-clubs.service';

describe('OtherSportClubsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OtherSportClubsService = TestBed.get(OtherSportClubsService);
    expect(service).toBeTruthy();
  });
});
