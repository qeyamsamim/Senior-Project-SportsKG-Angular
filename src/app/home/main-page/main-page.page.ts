import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from 'src/app/news/news.service';
import { News } from 'src/app/news/news.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit, OnDestroy {
  loadedNews: News[];
  private newsSub: Subscription;
  isLoading = false;

  other = {
    slidesPerView: 2,
    spaceBetween: 7
  };

  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.newsSub = this.newsService.news.subscribe(news => {
      this.loadedNews = news.reverse();
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.newsService.fetchNews().subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.newsSub) {
      this.newsSub.unsubscribe();
    }
  }
}
