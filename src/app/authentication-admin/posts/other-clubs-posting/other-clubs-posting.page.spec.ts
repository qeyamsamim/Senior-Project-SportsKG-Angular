import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtherClubsPostingPage } from './other-clubs-posting.page';

describe('OtherClubsPostingPage', () => {
  let component: OtherClubsPostingPage;
  let fixture: ComponentFixture<OtherClubsPostingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherClubsPostingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtherClubsPostingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
