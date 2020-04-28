import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Post } from '../forum.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { ForumService } from '../forum.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentsService } from './comments.service';
import { Comment } from './comment.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit, OnDestroy {
  @Input() post: Post;
  postSub: Subscription;
  isLoading = false;
  form: FormGroup;
  loadedComments: Comment[];
  commentSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private forumService: ForumService,
    private alertCtlr: AlertController,
    private router: Router,
    private commentsService: CommentsService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paraMap => {
      if (!paraMap.has('postId')) {
        this.navCtrl.navigateBack('/forum');
        return;
      }
      this.isLoading = true;
      this.postSub = this.forumService.getPost(paraMap.get('postId')).subscribe(post => {
        this.post = post;
        this.isLoading = false;
      },
      // It checks if a post id exists or not.
      error => {
        this.alertCtlr.create({
          header: 'An error occured!',
          message: 'Could not load the page.',
          buttons: [{
            text: 'Okay',
            handler: () => {
              this.router.navigate(['/forum']);
            }
          }]
        }).then(alertEl => alertEl.present());
      });
      this.commentSub = this.commentsService.comments.subscribe(comments => {
        this.loadedComments = comments.reverse();
      });
      this.form = new FormGroup({
        comment: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required]
        })
      });
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.commentsService.fetchComment().subscribe(() => {
      this.isLoading = false;
    });
  }

  onCreateComment() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Posting Comment...'
    }).then(loadingEl => {
      loadingEl.present();
      this.commentsService.addComment(this.form.value.comment, this.post.id).subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
      });
    });
  }

  ngOnDestroy() {
    if (!this.postSub) {
      this.postSub.unsubscribe();
    }
    if (!this.commentSub) {
      this.commentSub.unsubscribe();
    }
  }

}
