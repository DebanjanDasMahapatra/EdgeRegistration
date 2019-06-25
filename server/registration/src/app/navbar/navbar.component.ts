import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public _appcomp: AppComponent) { }
  password: string = '';
  actualPassword: string = '';

  ngOnInit() {
  }

  login() {
    if(this.actualPassword == this.password)
      this._appcomp.loggedIn = true;
    else
      alert('Invalid Password !!!');
    this.password = '';
  }

  logout() {
    this._appcomp.loggedIn = false;
  }
}
