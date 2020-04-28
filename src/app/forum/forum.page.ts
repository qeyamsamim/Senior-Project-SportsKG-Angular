import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForumService } from './forum.service';
import { Post } from './forum.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit, OnDestroy {
  form: FormGroup;
  loadedPosts: Post[];
  postSub: Subscription;
  isLoading = false;

  constructor(
    private forumService: ForumService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.postSub = this.forumService.posts.subscribe(posts => {
      this.loadedPosts = posts.reverse();
    });
    this.form = new FormGroup({
      content: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.forumService.fetchPosts().subscribe(() => {
      this.isLoading = false;
    });
  }

  onCreatePost() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Posting ...'
    }).then(loadingEl => {
      loadingEl.present();
      this.forumService.addPost(this.form.value.content).subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/forum']);
      });
    });
  }

  ngOnDestroy() {
    if (!this.postSub) {
      this.postSub.unsubscribe();
    }
  }
}
