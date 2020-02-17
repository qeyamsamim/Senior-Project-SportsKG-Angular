import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtherSportClubsPage } from './other-sport-clubs.page';

describe('OtherSportClubsPage', () => {
  let component: OtherSportClubsPage;
  let fixture: ComponentFixture<OtherSportClubsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherSportClubsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtherSportClubsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
