import { Injectable } from '@angular/core';
import { Comment } from './comment.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { take, switchMap, tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface CommentData {
  id: string;
  comment: string;
  postId: string;
  postDate: Date;
  posterId: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private _comments = new BehaviorSubject<Comment[]>([]);

  get comments() {
    return this._comments.asObservable();
  }
  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  addComment(comment: string, postId: string) {
    let generatedId: string;
    let newComment: Comment;
    return this.authService.userId.pipe(take(1), switchMap(userId => {
      if (!userId) {
        throw new Error('No user id found!');
      }
      newComment = new Comment(
        Math.random().toString(),
        comment,
        postId,
        new Date(),
        userId
      );
      return this.http.post<{name: string}>(
        'https://sportskg-4a84d.firebaseio.com/comments.json',
        { ...newComment, id: null }
      );
    }), switchMap(resData => {
          generatedId = resData.name;
          return this.comments;
        }),
        take(1),
        tap(comments => {
          newComment.id = generatedId;
          this._comments.next(comments.concat(newComment));
          }
        )
    );
  }

  fetchComment() {
    return this.http.get<{[key: string]: CommentData}>(
      `https://sportskg-4a84d.firebaseio.com/comments.json`
    )
    .pipe(map(resData => {
      const comments = [];
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          comments.push(new Comment(key, resData[key].comment, resData[key].postId, resData[key].postDate, resData[key].posterId));
        }
      }
      return comments;
    }),
    tap(comments => {
      this._comments.next(comments);
    })
    );
  }

}
