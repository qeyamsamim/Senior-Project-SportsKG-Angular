import { Injectable } from '@angular/core';
import { SportClubs } from './sport-clubs.model';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PlaceLocation } from '../home/location.model';

interface ClubData {
  address: string;
  contactNum: string;
  description: string;
  imgUrl: string;
  name: string;
  location: PlaceLocation;
}

@Injectable({
  providedIn: 'root'
})
export class OtherSportClubsService {
  private _sportClubs = new BehaviorSubject<SportClubs[]>([]);

  get sportClubs() {
    return this._sportClubs.asObservable();
  }

  constructor(private http: HttpClient) { }

  fetchSportClubs() {
    return this.http
      .get<{[key: string]: ClubData }>('https://sportskg-4a84d.firebaseio.com/sport-clubs.json')
      .pipe(map(resData => {
        const sportClubs = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            sportClubs.push(new SportClubs(
              key,
              resData[key].name,
              resData[key].description,
              resData[key].address,
              resData[key].contactNum,
              resData[key].imgUrl,
              resData[key].location)
            );
          }
        }
        return sportClubs;
      }), tap(sportClubs => {
        this._sportClubs.next(sportClubs);
      })
    );
  }

  getSportClubs(id: string) {
    return this.http
    .get<ClubData>(
      `https://sportskg-4a84d.firebaseio.com/sport-clubs/${id}.json`
    ).pipe(
      map(clubData => {
        return new SportClubs(
          id,
          clubData.name,
          clubData.description,
          clubData.address,
          clubData.contactNum,
          clubData.imgUrl,
          clubData.location
        );
      })
    );
  }

  addSportClub(name: string, description: string, address: string, contact: string, location: PlaceLocation) {
    let generatedId: string;
    const newSportClub = new SportClubs(
      Math.random().toString(),
      name,
      description,
      address,
      contact,
      'http://www.plazahotel.kg/cache/plg_lightimg/images.gallery.spa.031_1280x720.jpg',
      location
    );
    return this.http
    .post<{name: string}>('https://sportskg-4a84d.firebaseio.com/sport-clubs.json', { ...newSportClub, id: null })
    .pipe(
      switchMap(resData => {
        generatedId = resData.name;
        return this.sportClubs;
      }), take(1),
      tap(sportClubs => {
        newSportClub.id = generatedId;
        this._sportClubs.next(sportClubs.concat(newSportClub));
      })
    );
  }
}
