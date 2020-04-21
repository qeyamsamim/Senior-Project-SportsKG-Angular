import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserMessagesPage } from './user-messages.page';

describe('UserMessagesPage', () => {
  let component: UserMessagesPage;
  let fixture: ComponentFixture<UserMessagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMessagesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserMessagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
