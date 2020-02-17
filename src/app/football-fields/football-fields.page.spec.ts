import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FootballFieldsPage } from './football-fields.page';

describe('FootballFieldsPage', () => {
  let component: FootballFieldsPage;
  let fixture: ComponentFixture<FootballFieldsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballFieldsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FootballFieldsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
