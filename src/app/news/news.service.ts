import { Injectable } from '@angular/core';
import { News } from './news.model';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface NewsData {
  imgUrl: string;
  postDate: string;
  text: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private _news = new BehaviorSubject<News[]>([]);

  get news() {
    return this._news.asObservable();
  }

  constructor(
    private http: HttpClient
  ) { }

  fetchNews() {
    return this.http
      .get<{[key: string]: NewsData }>('https://sportskg-4a84d.firebaseio.com/news.json')
      .pipe(map(resData => {
        const news = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            news.push(new News(
              key,
              resData[key].title,
              resData[key].text,
              resData[key].imgUrl,
              new Date(resData[key].postDate)
              )
            );
          }
        }
        return news;
      }),
      tap(news => {
        this._news.next(news);
      })
    );
  }

  getNews(id: string) {
    return this.http
    .get<NewsData>(
      `https://sportskg-4a84d.firebaseio.com/news/${id}.json`
    ).pipe(
      map(newsData => {
        return new News(
          id,
          newsData.title,
          newsData.text,
          newsData.imgUrl,
          new Date(newsData.postDate)
        );
      })
    );
  }

  addNews(title: string, text: string) {
    let generatedId: string;
    const newNews = new News(
      Math.random().toString(),
      title,
      text,
      'https://upload.wikimedia.org/wikipedia/commons/c/c7/Flag_of_Kyrgyzstan.svg',
      new Date()
    );
    return this.http
      .post<{name: string}>('https://sportskg-4a84d.firebaseio.com/news.json', {
        ...newNews,
        id: null
      })
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.news;
        }),
        take(1),
        tap(news => {
          newNews.id = generatedId;
          this._news.next(news.concat(newNews));
        })
      );
  }
}
