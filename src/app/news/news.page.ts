import { Component, OnInit, OnDestroy } from '@angular/core';
import { News } from './news.model';
import { NewsService } from './news.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit, OnDestroy {
  loadedNews: News[];
  isLoading = false;
  private newsSub: Subscription;

  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.newsSub = this.newsService.news.subscribe(news => {
      this.loadedNews = news;
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
