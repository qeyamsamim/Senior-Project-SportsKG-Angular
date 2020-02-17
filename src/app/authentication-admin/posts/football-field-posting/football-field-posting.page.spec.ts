import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FootballFieldPostingPage } from './football-field-posting.page';

describe('FootballFieldPostingPage', () => {
  let component: FootballFieldPostingPage;
  let fixture: ComponentFixture<FootballFieldPostingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballFieldPostingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FootballFieldPostingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
