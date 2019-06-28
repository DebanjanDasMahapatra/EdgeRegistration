import { Component, OnInit, ViewChild } from '@angular/core';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { EnrollmentService } from '../enrollment.service';
import { AppComponent } from '../app.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-participant-mailer',
  templateUrl: './participant-mailer.component.html',
  styleUrls: ['./participant-mailer.component.css', '../app.component.css']
})
export class ParticipantMailerComponent implements OnInit {

  @ViewChild(NgProgressComponent) progBar: NgProgressComponent;
  databaseError = 'Please Check Your DataBase connectivity. If you are using MongoDB at localhost, make sure it is turned on. If you are using online MongoDB server, check your internet connection.';
  serverError = 'Some Internal Server Error Occured !!! Please check the server connection';
  constructor(public _enrollment: EnrollmentService, public _appcomp: AppComponent, private _snackBar: MatSnackBar) { }
  to = [];
  subject: string;
  message: string;
  messageType: string;
  secret: string;
  loaded: boolean = false;
  hide: boolean = false;
  refreshing: boolean = false;
  refreshMessage: string = 'Refresh';
  users; flawless; bughunt; cryptoquest; webdesign;
  adminPassword: string;
  type = 0; festEvent = ''; emailUser = -1; teamIndex = -1;

  ngOnInit() {
    this.loaddata(true);
  }

  sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  loaddata(start: boolean, refresh: boolean = false) {
    if (refresh) {
      this.startPB();
      this.refreshing = true;
      this.refreshMessage = 'Refreshing';
    }
    this._enrollment.fetch().subscribe(data => {
      if (data.status) {
        this.users = data.data;
        this.sortByKey(this.users, "name");
        this._enrollment.fetchFlawlessTeam().subscribe(data => {
          if (data.status) {
            this.flawless = data.data;
            this.sortByKey(this.flawless, "name");
            this._enrollment.fetchBughuntTeam().subscribe(data => {
              if (data.status) {
                this.bughunt = data.data;
                this.sortByKey(this.bughunt, "name");
                this._enrollment.fetchCryptoquestTeam().subscribe(data => {
                  if (data.status) {
                    this.cryptoquest = data.data;
                    this.sortByKey(this.cryptoquest, "name");
                    this._enrollment.fetchWebdesignTeam().subscribe(data => {
                      if (data.status) {
                        this.webdesign = data.data;
                        this.sortByKey(this.webdesign, "name");
                        this.loaded = true;
                        if (!start)
                          this.endPB();
                        if (refresh)
                          this.refreshing = false;
                        this.refreshMessage = 'Refresh';
                        this.openSnackBar('Participant Mailer Initialized Successfully !!!', 'OK');
                      }
                      else {
                        this.finishLoading(start,refresh,this.databaseError);
                      }
                    }, error => {
                      console.log(error);
                      this.finishLoading(start,refresh,this.serverError);
                    });
                  }
                  else {
                    this.finishLoading(start,refresh,this.databaseError);
                  }
                }, error => {
                  console.log(error);
                  this.finishLoading(start,refresh,this.serverError);
                });
              }
              else {
                this.finishLoading(start,refresh,this.databaseError);
              }
            }, error => {
              console.log(error);
              this.finishLoading(start,refresh,this.serverError);
            });
          }
          else {
            this.finishLoading(start,refresh,this.databaseError);
          }
        }, error => {
          console.log(error);
          this.finishLoading(start,refresh,this.serverError);
        });
      }
      else {
        this.finishLoading(start,refresh,this.databaseError);
      }
    }, error => {
      console.log(error);
      this.finishLoading(start,refresh,this.serverError);
    });
  }

  finishLoading(start: boolean, refresh: boolean = false, message: string) {
    this.loaded = true;
    this.openSnackBar(message, 'OK');
    if (!start)
      this.endPB();
    if (refresh)
      this.refreshing = false;
    this.refreshMessage = 'Try Refreshing Again';
  }

  startPB() {
    this.progBar.start();
  }
  endPB() {
    this.progBar.complete();
  }

  fetchEmailsForMailing(single: boolean) {
    this.to = [];
    if (single) {
      console.log(this.emailUser);
      this.to.push(this.users[this.emailUser].emaill);
    }
    else {
      this.emailUser = -1;
      let mails = [];
      switch (this.festEvent) {
        case 'f':
          mails = this.fetchMails('f', this.teamIndex, this.flawless);
          break;
        case 'b':
          mails = this.fetchMails('b', this.teamIndex, this.bughunt);
          break;
        case 'c':
          mails = this.fetchMails('c', this.teamIndex, this.cryptoquest);
          break;
        case 'w':
          mails = this.fetchMails('w', this.teamIndex, this.webdesign);
          break;
      }
      this.to = mails;
    }
  }

  allReset(sure: boolean) {
    if (sure)
      this.festEvent = '';
    this.teamIndex = -1;
    this.emailUser = -1;
    this.to = [];
  }

  fetchMails(eventType: string, teamIndex: number, teamArray: any) {
    let mails = [], teamMembers = [], teamMem;
    for (let i = 0; i < teamArray.length; i++)
      if (i == teamIndex) {
        teamMem = teamArray[i].members.mem1.split('_');
        teamMembers.push({ name: teamMem[0], rcid: teamMem[1] })
        teamMem = teamArray[i].members.mem2.split('_');
        teamMembers.push({ name: teamMem[0], rcid: teamMem[1] })
        if (eventType == 'f') {
          teamMem = teamArray[i].members.mem3.split('_');
          teamMembers.push({ name: teamMem[0], rcid: teamMem[1] })
        }
      }
    for (let i = 0; i < this.users.length; i++)
      for (let j = 0; j < teamMembers.length; j++)
        if (this.users[i].name == teamMembers[j].name && this.users[i].rcid == teamMembers[j].rcid)
          mails.push(this.users[i].emaill);
    return mails;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

  mailUser(e: any) {
    if (this.to.length == 0)
      this.openSnackBar('Please select atleast one user to send the mail !!!', 'Ok');
    else {
      this.adminPassword = prompt('Please Enter your Gmail Password: ');
      if (this.adminPassword == '')
        this.openSnackBar('Please Enter your Gmail Password to Send the Mail !!!', 'Ok');
      else if (confirm('Send the Mail ?')) {
        this.startPB();
        let mailInfo = {
          users: this.to,
          subject: this.subject,
          message: this.message,
          type: this.messageType,
          adminEmailId: JSON.parse(localStorage.getItem('loggedIn')).emaill,
          adminEmailPassword: this.adminPassword
        };
        this._enrollment.mailUsers(mailInfo).subscribe(
          data => {
            this.openSnackBar('Mailed all selected users successfully !!!', 'Thank You');
            e.target.reset();
            this.endPB();
          },
          error => {
            this.openSnackBar('Mail Not Sent !!! ' + this.serverError, 'OK');
            this.endPB();
          }
        );
      }
    }
  }
}
