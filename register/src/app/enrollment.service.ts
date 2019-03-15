import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Flawless } from './flawless';
import { Cryptoquest } from './cryptoquest';
import { Webdesign } from './webdesign';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  _url1 = 'http://localhost:3000/enroll';
  _url2 = 'http://localhost:3000/fetch';
  _url3 = 'http://localhost:3000/fetchFlawless';
  _url4 = 'http://localhost:3000/fetchBughunt';
  _url5 = 'http://localhost:3000/fetchCryptoquest';
  _url6 = 'http://localhost:3000/fetchWebdesign';
  _url7 = 'http://localhost:3000/teamFlawless';
  _url8 = 'http://localhost:3000/fetchFlawlessTeam';
  _url9 = 'http://localhost:3000/teamCryptoquest';
  _url10 = 'http://localhost:3000/fetchCryptoquestTeam';
  _url11 = 'http://localhost:3000/teamWebdesign';
  _url12 = 'http://localhost:3000/fetchWebdesignTeam';
  constructor(private _http: HttpClient) { }
    enroll(user: User) {
      return this._http.post<any>(this._url1,user);
    }
    teamUpFlawless(team: Flawless) {
      return this._http.post<any>(this._url7,team);
    }
    teamUpCryptoquest(team: Cryptoquest) {
      return this._http.post<any>(this._url9,team);
    }
    teamUpWebdesign(team: Webdesign) {
      return this._http.post<any>(this._url11,team);
    }
    fetch() {
      return this._http.get<any>(this._url2);
    }
    fetchFlawless() {
      return this._http.get<any>(this._url3);
    }
    fetchFlawlessTeam() {
      return this._http.get<any>(this._url8);
    }
    fetchBughunt() {
      return this._http.get<any>(this._url4);
    }
    fetchCryptoquest() {
      return this._http.get<any>(this._url5);
    }
    fetchCryptoquestTeam() {
      return this._http.get<any>(this._url10);
    }
    fetchWebdesign() {
      return this._http.get<any>(this._url6);
    }
    fetchWebdesignTeam() {
      return this._http.get<any>(this._url12);
    }
}
