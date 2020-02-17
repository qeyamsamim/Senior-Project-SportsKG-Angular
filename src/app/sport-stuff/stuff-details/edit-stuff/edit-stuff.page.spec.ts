import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditStuffPage } from './edit-stuff.page';

describe('EditStuffPage', () => {
  let component: EditStuffPage;
  let fixture: ComponentFixture<EditStuffPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStuffPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditStuffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
