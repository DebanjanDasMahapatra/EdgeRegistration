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
  _APIF = '/flawless';
  _APIB = '/bughunt';
  _APIC = '/cryptoquest';
  _APIW = '/webdesign';
  _APIR = '/user';
  _APIA = '/admin';
  _API = 'http://localhost';

  constructor(private _http: HttpClient) { }

    //Registration APIs
    enroll(user: User) {
      return this._http.post<any>(this._API+this._APIR+'/enroll',user);
    }
    change(user: User, flag: string) {
      return this._http.post<any>(this._API+this._APIR+'/change',{prev: user,id: flag});
    }
    deleteUser(flag: string) {
      return this._http.post<any>(this._API+this._APIR+'/delete',{id: flag});
    }
    fetch() {
      return this._http.get<any>(this._API+this._APIR+'/fetch');
    }

    //Flawless APIs
    teamUpFlawless(team: Flawless) {
      return this._http.post<any>(this._API+this._APIF+'/addTeam',team);
    }
    addMemberFlawless(val: {}) {
      return this._http.post<any>(this._API+this._APIF+'/addTeamMem',val);
    }
    delMemberFlawless(val: {}) {
      return this._http.post<any>(this._API+this._APIF+'/delTeamMem',val);
    }
    delTeamFlawless(val: {}) {
      return this._http.post<any>(this._API+this._APIF+'/delTeam',val);
    }
    fetchFlawless() {
      return this._http.get<any>(this._API+this._APIF+'/getEligibles');
    }
    fetchFlawlessTeam() {
      return this._http.get<any>(this._API+this._APIF+'/getTeams');
    }

    //Bughunt APIs
    teamUpBughunt(team: Bughunt) {
      return this._http.post<any>(this._API+this._APIB+'/addTeam',team);
    }
    addMemberBughunt(val: {}) {
      return this._http.post<any>(this._API+this._APIB+'/addTeamMem',val);
    }
    delMemberBughunt(val: {}) {
      return this._http.post<any>(this._API+this._APIB+'/delTeamMem',val);
    }
    delTeamBughunt(val: {}) {
      return this._http.post<any>(this._API+this._APIB+'/delTeam',val);
    }
    fetchBughunt() {
      return this._http.get<any>(this._API+this._APIB+'/getEligibles');
    }
    fetchBughuntTeam() {
      return this._http.get<any>(this._API+this._APIB+'/getTeams');
    }

    //Cryptoquest APIs
    teamUpCryptoquest(team: Cryptoquest) {
      return this._http.post<any>(this._API+this._APIC+'/addTeam',team);
    }
    addMemberCryptoquest(val: {}) {
      return this._http.post<any>(this._API+this._APIC+'/addTeamMem',val);
    }
    delMemberCryptoquest(val: {}) {
      return this._http.post<any>(this._API+this._APIC+'/delTeamMem',val);
    }
    delTeamCryptoquest(val: {}) {
      return this._http.post<any>(this._API+this._APIC+'/delTeam',val);
    }
    fetchCryptoquest() {
      return this._http.get<any>(this._API+this._APIC+'/getEligibles');
    }
    fetchCryptoquestTeam() {
      return this._http.get<any>(this._API+this._APIC+'/getTeams');
    }

    //Webdesign APIs
    teamUpWebdesign(team: Webdesign) {
      return this._http.post<any>(this._API+this._APIW+'/addTeam',team);
    }
    addMemberWebdesign(val: {}) {
      return this._http.post<any>(this._API+this._APIW+'/addTeamMem',val);
    }
    delMemberWebdesign(val: {}) {
      return this._http.post<any>(this._API+this._APIW+'/delTeamMem',val);
    }
    delTeamWebdesign(val: {}) {
      return this._http.post<any>(this._API+this._APIW+'/delTeam',val);
    }
    fetchWebdesign() {
      return this._http.get<any>(this._API+this._APIW+'/getEligibles');
    }
    fetchWebdesignTeam() {
      return this._http.get<any>(this._API+this._APIW+'/getTeams');
    }

    //Admin APIs
    adminRegister(val: {}) {
      return this._http.post<any>(this._API+this._APIA+'/register',val);
    }
    adminLogin(val: {}) {
      return this._http.post<any>(this._API+this._APIA+'/login',val);
    }
    mailUsers(val: {}) {
      return this._http.post<any>(this._API+this._APIA+'/sendMail',val);
    }
}
