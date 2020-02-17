import { Component, OnInit, OnDestroy } from '@angular/core';
import { News } from '../news.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { NewsService } from '../news.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit, OnDestroy {
  news: News;
  private newsSub: Subscription;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private newsService: NewsService,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paraMap => {
      if (!paraMap.has('newsId')) {
        this.navCtrl.navigateBack('/news');
        return;
      }
      this.isLoading = true;
      this.newsSub = this.newsService.getNews(paraMap.get('newsId')).subscribe(news => {
        this.news = news;
        this.isLoading = false;
      },
      // It checks if a news id exists or not.
      error => {
        this.alertCtrl.create({
          header: 'An error occured!',
          message: 'Could not load the page.',
          buttons: [{ text: 'Okay', handler: () => {
            this.router.navigate(['/news']);
          }}]
        }).then(alertEl => alertEl.present());
      });
    });
  }

  ngOnDestroy() {
    if (this.newsSub) {
      this.newsSub.unsubscribe();
    }
  }

}
