import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Flawless } from './flawless';
import { Bughunt } from './bughunt';
import { Cryptoquest } from './cryptoquest';
import { Webdesign } from './webdesign';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  _urlF = '/flawless';
  _urlB = '/bughunt';
  _urlC = '/cryptoquest';
  _urlW = '/webdesign';
  _urlR = '/user';
  _url = 'http://localhost';

  constructor(private _http: HttpClient) { }

    //Registration URLs
    enroll(user: User) {
      return this._http.post<any>(this._url+this._urlR+'/enroll',user);
    }
    change(user: User, flag: string) {
      return this._http.post<any>(this._url+this._urlR+'/change',{prev: user,id: flag});
    }
    deleteUser(flag: string) {
      return this._http.post<any>(this._url+this._urlR+'/delete',{id: flag});
    }
    fetch() {
      return this._http.get<any>(this._url+this._urlR+'/fetch');
    }
    evaluate(arg0: { c: string; l: string; }) {
      return this._http.post<any>(this._url+'/execute',arg0);
    }

    //Flawless URLs
    teamUpFlawless(team: Flawless) {
      return this._http.post<any>(this._url+this._urlF+'/addTeam',team);
    }
    addMemberFlawless(val: {}) {
      return this._http.post<any>(this._url+this._urlF+'/addTeamMem',val);
    }
    delMemberFlawless(val: {}) {
      return this._http.post<any>(this._url+this._urlF+'/delTeamMem',val);
    }
    delTeamFlawless(val: {}) {
      return this._http.post<any>(this._url+this._urlF+'/delTeam',val);
    }
    fetchFlawless() {
      return this._http.get<any>(this._url+this._urlF+'/getEligibles');
    }
    fetchFlawlessTeam() {
      return this._http.get<any>(this._url+this._urlF+'/getTeams');
    }

    //Bughunt URLs
    teamUpBughunt(team: Bughunt) {
      return this._http.post<any>(this._url+this._urlB+'/addTeam',team);
    }
    addMemberBughunt(val: {}) {
      return this._http.post<any>(this._url+this._urlB+'/addTeamMem',val);
    }
    delMemberBughunt(val: {}) {
      return this._http.post<any>(this._url+this._urlB+'/delTeamMem',val);
    }
    delTeamBughunt(val: {}) {
      return this._http.post<any>(this._url+this._urlB+'/delTeam',val);
    }
    fetchBughunt() {
      return this._http.get<any>(this._url+this._urlB+'/getEligibles');
    }
    fetchBughuntTeam() {
      return this._http.get<any>(this._url+this._urlB+'/getTeams');
    }

    //Cryptoquest URLs
    teamUpCryptoquest(team: Cryptoquest) {
      return this._http.post<any>(this._url+this._urlC+'/addTeam',team);
    }
    addMemberCryptoquest(val: {}) {
      return this._http.post<any>(this._url+this._urlC+'/addTeamMem',val);
    }
    delMemberCryptoquest(val: {}) {
      return this._http.post<any>(this._url+this._urlC+'/delTeamMem',val);
    }
    delTeamCryptoquest(val: {}) {
      return this._http.post<any>(this._url+this._urlC+'/delTeam',val);
    }
    fetchCryptoquest() {
      return this._http.get<any>(this._url+this._urlC+'/getEligibles');
    }
    fetchCryptoquestTeam() {
      return this._http.get<any>(this._url+this._urlC+'/getTeams');
    }

    //Webdesign URLs
    teamUpWebdesign(team: Webdesign) {
      return this._http.post<any>(this._url+this._urlW+'/addTeam',team);
    }
    addMemberWebdesign(val: {}) {
      return this._http.post<any>(this._url+this._urlW+'/addTeamMem',val);
    }
    delMemberWebdesign(val: {}) {
      return this._http.post<any>(this._url+this._urlW+'/delTeamMem',val);
    }
    delTeamWebdesign(val: {}) {
      return this._http.post<any>(this._url+this._urlW+'/delTeam',val);
    }
    fetchWebdesign() {
      return this._http.get<any>(this._url+this._urlW+'/getEligibles');
    }
    fetchWebdesignTeam() {
      return this._http.get<any>(this._url+this._urlW+'/getTeams');
    }
}
