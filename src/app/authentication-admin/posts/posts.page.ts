import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.router.navigateByUrl('/authentication-admin');
  }
}
