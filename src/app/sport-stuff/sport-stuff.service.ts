import { Injectable } from '@angular/core';
import { SportStuff } from './sport-stuff.model';
import { AuthService } from '../authentication/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface StuffData {
  city: string;
  condition: string;
  description: string;
  imgUrl: string;
  name: string;
  price: number;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class SportStuffService {
//  https://console.firebase.google.com/u/1/project/sportskg-4a84d/database/sportskg-4a84d/data
  private _sportStuff = new BehaviorSubject<SportStuff[]>([]);

  get sportStuff() {
    return this._sportStuff.asObservable();
  }

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  fetchNewStuff() {
    return this.http.get<{[key: string]: StuffData }>('https://sportskg-4a84d.firebaseio.com/sport-stuffs.json')
    .pipe(map(resData => {
      const stuffs = [];
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          stuffs.push(new SportStuff(
            key,
            resData[key].name,
            resData[key].description,
            resData[key].imgUrl,
            resData[key].price,
            resData[key].condition,
            resData[key].city,
            resData[key].userId
          ));
        }
      }
      return stuffs;
    }),
    tap(stuffs => {
      this._sportStuff.next(stuffs);
    })
    );
  }

  getStuff(id: string) {
    return this.http.get<StuffData>(
      `https://sportskg-4a84d.firebaseio.com/sport-stuffs/${id}.json`
    ).pipe(
      map(stuffData => {
        return new SportStuff(
          id,
          stuffData.name,
          stuffData.description,
          stuffData.imgUrl,
          stuffData.price,
          stuffData.condition,
          stuffData.city,
          stuffData.userId
        );
    }));
  }

  uploadImage(image: File) {
    const uploadData = new FormData();
    uploadData.append('image', image);

    return this.http
    .post<{imageUrl: string, imagePath: string}>('https://us-central1-sportskg-4a84d.cloudfunctions.net/storeImage', uploadData);
  }

  addStuff(name: string, description: string, price: number, condition: string, city: string, imageUrl: string) {
    let generatedId: string;
    let newStuff: SportStuff;
    return this.authService.userId.pipe(take(1), switchMap(userId => {
      if (!userId) {
        throw new Error('No user found!');
      }
      newStuff = new SportStuff(
        Math.random().toString(),
        name,
        description,
        imageUrl,
        price,
        condition,
        city,
        userId
      );
      return this.http
      .post<{name: string}>(
        'https://sportskg-4a84d.firebaseio.com/sport-stuffs.json',
        { ...newStuff, id: null }
      );
    }),
      switchMap(resData => {
        generatedId = resData.name;
        return this.sportStuff;
      }),
      take(1),
      tap(sportStuff => {
        newStuff.id = generatedId;
        this._sportStuff.next(sportStuff.concat(newStuff));
      })
    );
  }

  updatePost(stuffId: string, name: string, description: string, condition: string, price: number, city: string) {
    let updatedPost: SportStuff[];
    return this.sportStuff.pipe(
      take(1),
      switchMap(stuffs => {
        const updatedPostIndex = stuffs.findIndex(s => s.id === stuffId);
        updatedPost = [...stuffs];
        const oldPost = updatedPost[updatedPostIndex]
        updatedPost[updatedPostIndex] = new SportStuff(
          oldPost.id,
          name,
          description,
          oldPost.imgUrl,
          price,
          condition,
          city,
          oldPost.userId
        );
        return this.http.put(
          `https://sportskg-4a84d.firebaseio.com/sport-stuffs/${stuffId}.json`,
          { ...updatedPost[updatedPostIndex], id: null }
        );
      }),
      tap(() => {
        this._sportStuff.next(updatedPost);
      })
    );
  }

  deleteStuff(stuffId: string) {
    return this.http.delete(
      `https://sportskg-4a84d.firebaseio.com/sport-stuffs/${stuffId}.json`
    ).pipe(
      switchMap(() => {
        return this.sportStuff;
      }),
      take(1),
      tap(stuffs => {
        this._sportStuff.next(stuffs.filter(s => s.id !== stuffId));
      })
    );
  }
}
