import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SportStuffPage } from './sport-stuff.page';

describe('SportStuffPage', () => {
  let component: SportStuffPage;
  let fixture: ComponentFixture<SportStuffPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportStuffPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SportStuffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
