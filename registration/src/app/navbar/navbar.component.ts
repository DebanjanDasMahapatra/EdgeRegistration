import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';
import { Credentials } from '../credentials';
import { Admin } from '../admin';
import { AdminRegisterDialogComponent } from '../admin-register-dialog/admin-register-dialog.component';
import { AdminLoginDialogComponent } from '../admin-login-dialog/admin-login-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EnrollmentService } from '../enrollment.service';
import { environment } from 'src/environments/environment';
import { NgProgressComponent } from '@ngx-progressbar/core';

export interface AdminRegisterDialogData {
  user: Admin;
  secret: String;
}

export interface LoginDialogData {
  credentials: Credentials
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild(NgProgressComponent) progBar: NgProgressComponent;
  constructor(public _enrollment: EnrollmentService, public _appcomp: AppComponent, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  databaseError = 'Please Check Your DataBase connectivity. If you are using MongoDB at localhost, make sure it is turned on. If you are using online MongoDB server, check your internet connection.';
  serverError = 'Some Internal Server Error Occured !!! Please check the server connection';
  secret: string = '';
  credentials = new Credentials('', '');
  user = new Admin('', '', '');
  loaded: boolean = false;
  name: string;

  ngOnInit() {
    if (localStorage.getItem('loggedIn')) {
      this._appcomp.loggedIn = true;
      this.name = JSON.parse(localStorage.getItem('loggedIn')).name;
    }
  }

  checkSecret() {
    if (environment.secret != this.secret)
      alert('Please enter Correct Admin Secret Key to Login');
    else
      this.onRegister();
    this.secret = '';
  }

  logout() {
    this._appcomp.loggedIn = false;
    localStorage.removeItem('loggedIn');
    this._appcomp.authorized = '';
  }

  startPB() {
    this.progBar.start();
  }
  endPB() {
    this.progBar.complete();
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(AdminRegisterDialogComponent, {
      width: '500px',
      hasBackdrop: false,
      data: { user: this.user, secret: this.secret }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.credentials = result.credentials;
      this.secret = result.secret;
      if (result.secret)
        this.checkSecret();
    });
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(AdminLoginDialogComponent, {
      width: '500px',
      hasBackdrop: false,
      data: { credentials: this.credentials }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.user = result;
      if (result.password)
        this.onLogin();
    });
  }

  onRegister() {
    this.startPB();
    this.loaded = false;
    this.user.emaill += '@gmail.com';
    this._enrollment.adminRegister(this.user).subscribe(
      data => {
        if (data.status) {
          this.openSnackBar('Admin Registered Successfully !!!', 'OK');
          location.reload();
        }
        else {
          this.openSnackBar('Admin Registration Failure !!! ' + this.databaseError, 'OK');
        }
        this.user = new Admin('', '', '');
        this.loaded = true;
        this.endPB();
      },
      error => {
        this.openSnackBar(this.serverError, 'OK');
        this.user = new Admin('', '', '');
        this.endPB();
        console.log(error);
        this.loaded = true;
      }
    );
  }

  onLogin() {
    this.startPB();
    this.loaded = false;
    this.credentials.emaill += '@gmail.com';
    console.log(this.credentials);

    this._enrollment.adminLogin(this.credentials).subscribe(
      data => {
        if (data.status) {
          if (data.admin) {
            this.openSnackBar('Admin Logged In Successfully !!!', 'OK');
            localStorage.setItem('loggedIn', JSON.stringify(data.admin));
            this.name = data.admin.name;
            this._appcomp.loggedIn = true;
          }
          else {
            this.openSnackBar('Incorrect Login Credentials !!!', 'OK');
          }
        }
        else {
          this.openSnackBar('Admin Login Failure !!! ' + this.databaseError, 'OK');
        }
        this.credentials = new Credentials('', '');
        this.loaded = true;
        this.endPB();
      },
      error => {
        this.openSnackBar(this.serverError, 'OK');
        this.credentials = new Credentials('', '');
        this.endPB();
        console.log(error);
        this.loaded = true;
      }
    );
  }

  openSnackBar(message: string, action: string) {
    if (this._appcomp.receiveConfirmationMessages)
      this.snackBar.open(message, action, {
        duration: 3000,
      });
  }
}
