import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  _url1 = 'http://localhost:3000/enroll';
  _url2 = 'http://localhost:3000/fetch';
  constructor(private _http: HttpClient) { }
    enroll(user: User) {
      return this._http.post<any>(this._url1,user);
    }
    fetch() {
      return this._http.get<any>(this._url2);
    }
}
