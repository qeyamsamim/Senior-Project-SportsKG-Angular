import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewsPostingPage } from './news-posting.page';

describe('NewsPostingPage', () => {
  let component: NewsPostingPage;
  let fixture: ComponentFixture<NewsPostingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsPostingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsPostingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
