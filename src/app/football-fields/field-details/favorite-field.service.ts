import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FavoriteField } from './favorite-field.model';
import { AuthService } from 'src/app/authentication/auth.service';
import { take, switchMap, tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface FavFieldData {
  fieldId: string;
  fieldName: string;
  fieldImage: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteFieldService {
  private _favoriteFields = new BehaviorSubject<FavoriteField[]>([]);

  get favoriteField() {
    return this._favoriteFields.asObservable();
  }

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  addFavField(fieldId: string, fieldName: string, fieldImage: string) {
    let generatedId: string;
    let newField: FavoriteField;
    return this.authService.userId.pipe(take(1), switchMap(userId => {
      if (!userId) {
        throw new Error('No user id found!');
      }
      newField = new FavoriteField(
        Math.random().toString(),
        fieldId,
        fieldName,
        fieldImage,
        userId
      );
      return this.http.post<{name: string}>(
        `https://sportskg-4a84d.firebaseio.com/favorite-fields.json`,
        {...newField, id: null}
      );
    }), switchMap(resData => {
      generatedId = resData.name;
      return this.favoriteField;
    }),
    take(1),
    tap(fields => {
      newField.id = generatedId;
      this._favoriteFields.next(fields.concat(newField));
    }));
  }

  fetchFavFields() {
    return this.authService.userId.pipe(take(1), switchMap(userId => {
      if (!userId) {
        throw new Error('User not found!');
      }
      return this.http.get<{[key: string]: FavFieldData }>(
        `https://sportskg-4a84d.firebaseio.com/favorite-fields.json?orderBy="userId"&equalTo="${
          userId
        }"`
      );
    }),
    map(favFieldData => {
      const fields = [];
      for (const key in favFieldData) {
        if (favFieldData.hasOwnProperty(key)) {
          fields.push(
            new FavoriteField(
              key,
              favFieldData[key].fieldId,
              favFieldData[key].fieldName,
              favFieldData[key].fieldImage,
              favFieldData[key].userId
            )
          );
        }
      }
      return fields;
    }), tap(fields => {
      this._favoriteFields.next(fields);
    }));
  }

  deleteField(fieldId: string) {
    return this.http.delete(
      `https://sportskg-4a84d.firebaseio.com/favorite-fields/${fieldId}.json`
    ).pipe(
      switchMap(() => {
        return this.favoriteField;
      }),
      take(1),
      tap(field => {
        this._favoriteFields.next(field.filter(f => f.id !== fieldId));
      })
    );
  }
}
