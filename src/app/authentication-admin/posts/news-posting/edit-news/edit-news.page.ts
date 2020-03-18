import { Component, OnInit, OnDestroy } from '@angular/core';
import { News } from 'src/app/news/news.model';
import { Subscription } from 'rxjs';
import { NewsService } from 'src/app/news/news.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.page.html',
  styleUrls: ['./edit-news.page.scss'],
})
export class EditNewsPage implements OnInit, OnDestroy {
  loadedNews: News[];
  isLoading = false;
  private newsSub: Subscription;

  constructor(
    private newsService: NewsService,
    private alertCtrl: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController
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

  deleteBtn(newsId: string) {
    this.alertCtrl
      .create({
        header: 'Delete',
        message: 'Are you sure you want to delete it?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.loadingCtrl.create({message: 'Deleting...' }).then(loadingEl => {
                loadingEl.present();
                this.newsService.deleteNews(newsId).subscribe();
                loadingEl.dismiss();
              });
            }
          },
          {
            text: 'No',
            handler: () => {
              this.router.navigate(['/authentication-admin/posts/news-posting/tabs/edit-news']);
            }
          }
        ],
      })
      .then(alertEl => {
        alertEl.present();
      });
  }

  ngOnDestroy() {
    if (this.newsSub) {
      this.newsSub.unsubscribe();
    }
  }

}
