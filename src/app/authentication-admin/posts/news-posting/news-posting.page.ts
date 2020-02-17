import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NewsService } from 'src/app/news/news.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-news-posting',
  templateUrl: './news-posting.page.html',
  styleUrls: ['./news-posting.page.scss'],
})
export class NewsPostingPage implements OnInit {
  form: FormGroup;

  constructor(
    private newsService: NewsService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      text: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  onCreatePost() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Posting News...'
    }).then(loadingEl => {
      loadingEl.present();
      this.newsService.addNews(
        this.form.value.title,
        this.form.value.text
      ).subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/news']);
      });
    });
  }
}
