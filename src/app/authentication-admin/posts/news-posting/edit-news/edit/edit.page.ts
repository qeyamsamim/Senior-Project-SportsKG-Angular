import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { NewsService } from 'src/app/news/news.service';
import { News } from 'src/app/news/news.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit, OnDestroy {
  form: FormGroup;
  isLoading = false;
  private newsSub: Subscription;
  news: News;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private newsService: NewsService,
    private alertCtrl: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('newsId')) {
        this.navCtrl.navigateBack('/authentication-admin/posts/news-posting/tabs/edit-news');
        return;
      }
      this.isLoading = true;
      this.newsSub = this.newsService
        .getNews(paramMap.get('newsId'))
        .subscribe(
          news => {
            this.news = news;
            this.form = new FormGroup({
              title: new FormControl(this.news.title, {
                updateOn: 'blur',
                validators: [Validators.required]
              }),
              text: new FormControl(this.news.text, {
                updateOn: 'blur',
                validators: [Validators.required]
              }),
              image: new FormControl(this.news.imgUrl)
            });
            this.isLoading = false;
        }, error => {
          this.alertCtrl
            .create({
              header: 'An error occurred!',
              message: 'The page cannot be loaded',
              buttons: [
                {
                  text: 'Okay',
                  handler: () => {
                    this.router.navigate(['/authentication-admin/posts/news-posting/tabs/edit-news']);
                  }
                }
              ]
            })
            .then(alertEl => {
              alertEl.present();
            });
        }
      );
    });
  }

  onUpdateNews() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Updating News...'
    }).then(loadingEl => {
      loadingEl.present();
      this.newsService.updateField(
        this.news.id,
        this.form.value.title,
        this.form.value.text
      ).subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/authentication-admin/posts/news-posting/tabs/edit-news']);
      });
    });
  }

  ngOnDestroy() {
    if (this.newsSub) {
      this.newsSub.unsubscribe();
    }
  }

}
