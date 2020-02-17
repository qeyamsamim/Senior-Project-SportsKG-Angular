import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../forum.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { ForumService } from '../forum.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit, OnDestroy {
  post: Post;
  postSub: Subscription;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private forumService: ForumService,
    private alertCtlr: AlertController,
    private router: Router
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
    });
  }

  ngOnDestroy() {
    if (!this.postSub) {
      this.postSub.unsubscribe();
    }
  }

}
