import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostClubPage } from './post-club.page';

describe('PostClubPage', () => {
  let component: PostClubPage;
  let fixture: ComponentFixture<PostClubPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostClubPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostClubPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
