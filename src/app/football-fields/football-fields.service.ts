import { Injectable } from '@angular/core';
import { FootballField } from './football-fields.model';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PlaceLocation } from '../home/location.model';

interface FieldData {
  address: string;
  contactNum: string;
  imgUrl: string;
  name: string;
  location: PlaceLocation;
}

@Injectable({
  providedIn: 'root'
})
export class FootballFieldsService {
  private _footballFields = new BehaviorSubject<FootballField[]>([]);

  get footballFields() {
    return this._footballFields.asObservable();
  }

  constructor(private http: HttpClient) { }

  fetchFields() {
    return this.http
    .get<{[key: string]: FieldData }>('https://sportskg-4a84d.firebaseio.com/football-fields.json')
    .pipe(map(resData => {
      const fields = [];
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          fields.push(
            new FootballField(
              key,
              resData[key].name,
              resData[key].address,
              resData[key].imgUrl,
              resData[key].contactNum,
              resData[key].location
            )
          );
        }
      }
      return fields;
      }),
      tap(fields => {
        this._footballFields.next(fields);
      })
    );
  }

  getField(id: string) {
    return this.http.get<FieldData>(
      `https://sportskg-4a84d.firebaseio.com/football-fields/${id}.json`
    ).pipe(
      map(fieldData => {
        return new FootballField(
          id,
          fieldData.name,
          fieldData.address,
          fieldData.imgUrl,
          fieldData.contactNum,
          fieldData.location);
      })
    );
  }

  addField(
    name: string,
    address: string,
    contactNum: string,
    location: PlaceLocation
  ) {
    let generatedId: string;
    const newField = new FootballField(
      Math.random().toString(),
      name,
      address,
      'https://leeuflames.com/images/2015/9/22/soccer_field_001.jpg',
      contactNum,
      location
    );
    return this.http
    .post<{name: string}>('https://sportskg-4a84d.firebaseio.com/football-fields.json', { ...newField, id: null})
    .pipe(
      switchMap(resData => {
        generatedId = resData.name;
        return this.footballFields;
      }),
      take(1),
      tap(footballFields => {
        newField.id = generatedId;
        this._footballFields.next(footballFields.concat(newField));
    })
    );
  }

  updateField(fieldId: string, name: string, address: string, contactNum: string, location: PlaceLocation) {
    let updatedFields: FootballField[];
    return this.footballFields.pipe(
      take(1), switchMap(fields => {
        const updatedFieldIndex = fields.findIndex(f => f.id === fieldId);
        updatedFields = [...fields];
        const oldField = updatedFields[updatedFieldIndex];
        updatedFields[updatedFieldIndex] = new FootballField(
          oldField.id,
          name,
          address,
          oldField.imgUrl,
          contactNum,
          location
        );
        return this.http.put(
          `https://sportskg-4a84d.firebaseio.com/football-fields/${fieldId}.json`,
          { ...updatedFields[updatedFieldIndex], id: null }
        );
      }), tap(() => {
        this._footballFields.next(updatedFields);
      })
    );
  }

  deleteField(fieldId: string) {
    return this.http.delete(
      `https://sportskg-4a84d.firebaseio.com/football-fields/${fieldId}.json`
    ).pipe(
      switchMap(() => {
        return this.footballFields;
      }),
      take(1),
      tap(fields => {
        this._footballFields.next(fields.filter(f => f.id !== fieldId));
      })
    );
  }
}
