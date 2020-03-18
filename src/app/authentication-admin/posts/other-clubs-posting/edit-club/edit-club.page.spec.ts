import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditClubPage } from './edit-club.page';

describe('EditClubPage', () => {
  let component: EditClubPage;
  let fixture: ComponentFixture<EditClubPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClubPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditClubPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
