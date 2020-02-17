import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuthenticationAdminPage } from './authentication-admin.page';

describe('AuthenticationAdminPage', () => {
  let component: AuthenticationAdminPage;
  let fixture: ComponentFixture<AuthenticationAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticationAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticationAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
