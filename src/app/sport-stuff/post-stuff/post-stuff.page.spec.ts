import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostStuffPage } from './post-stuff.page';

describe('PostStuffPage', () => {
  let component: PostStuffPage;
  let fixture: ComponentFixture<PostStuffPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostStuffPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostStuffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
