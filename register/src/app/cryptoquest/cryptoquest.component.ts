import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { EnrollmentService } from '../enrollment.service';
import { AppComponent } from '../app.component';
import { Cryptoquest } from '../cryptoquest';

@Component({
  selector: 'app-cryptoquest',
  templateUrl: './cryptoquest.component.html',
  styleUrls: ['./cryptoquest.component.css', '../app.component.css']
})
export class CryptoquestComponent implements OnInit {

  users: {};
  actualusers = [];
  teams: {};
  @ViewChild('cteams') table: ElementRef;
  searchText: string = '';
  constructor(public _enrollment: EnrollmentService, public _appcomp: AppComponent, public _location: Location) { }

  i: number;
  datasize: number;
  teamNum: number;
  members = [];
  done: boolean;
  teamsize: number = 2;
  type = '';
  info = '';
  empty: number = -1;
  emptyMem: string;
  userModel = new Cryptoquest("", "", { mem1: "", mem2: "" });
  userNew = new Cryptoquest("", "", { mem1: "", mem2: "" });

  ngOnInit() {
    this.i = 0;
    this.done = false;
    console.log('Queried');
    this.onQuery();
  }

  checkExistance(v: string) {
    for (let k = 0; k < this.teamNum; k++) {
      if (v == this.teams[k].members.mem1 || v == this.teams[k].members.mem2)
        return true;
    }
    return false;
  }

  infoDisplay(rcid: number) {
    let flag = false;
    for(let i=0;i<Object.keys(this.users).length;i++)
    Object.keys(this.users[i]).forEach(key => {
      if (key == "rcid" && this.users[i][key] == rcid) {
          this.info = "Email: "+this.users[i].emaill+"\r\nContact: "+this.users[i].contact+"\r\nCollege: "+this.users[i].college;
          flag = true;
      }
    });
    if(!flag)
      this.info = "Info not available !!!";
  }

  checkTeam(v: number) {
    if ((this.i < this.teamsize || this.members[v].selected) && this.empty == -1) {
      this.members[v].selected = !this.members[v].selected;
      if (this.members[v].selected)
        this.i++;
      else
        this.i--;
    }
    this.done = (this.i <= this.teamsize && this.i > 0);
  }

  onSubmit(event: any) {

    for (let k = 0; k < this.datasize; k++) {
      if (this.members[k].selected && this.i == 2) {
        this.userModel.members.mem2 = this.actualusers[k].name + "_" + this.actualusers[k].rcid;
        this.i--;
      }
      else if (this.members[k].selected && this.i == 1) {
        this.userModel.members.mem1 = this.actualusers[k].name + "_" + this.actualusers[k].rcid;
        this.i--;
      }
    }
    this._enrollment.teamUpCryptoquest(this.userModel).subscribe(
      data => {
        console.log('Success', data);
        window.location.reload();
      },
      error => console.log('Error', error),
    );
    this.i = 0;
    this.done = false;
    event.target.reset();
  }

  onQuery() {
    this.members = [];
    this.actualusers = [];
    this._enrollment.fetchCryptoquestTeam().subscribe(
      data => {
        console.log('Success', data);
        this.teams = data;
        this.teamNum = Object.keys(data).length;
      },
      error => console.log('Error', error),
    );

    this._enrollment.fetchCryptoquest().subscribe(
      data => {
        console.log('Success', data);
        this.users = data;
        let total = 0;
        for (let k = 0; k < Object.keys(data).length; k++) {
          let val = { selected: false, name: this.users[k].name };
          if (!this.checkExistance(this.users[k].name + "_" + this.users[k].rcid)) {
            this.actualusers.push(data[k]);
            (this.members).push(val);
            total++;
          }
        }
        this.datasize = total;
      },
      error => console.log('Error', error),
    );
  }

  goWork(i: number) {
    if (this.type != '') {
      if (this.teams[this.empty].members.mem2 == "")
        this.emptyMem = "mem2";
      else if (this.teams[this.empty].members.mem3 == "")
        this.emptyMem = "mem3";
      this._enrollment.addMemberCryptoquest({ id: this.teams[this.empty]._id, emptyMember: this.emptyMem, value: this.actualusers[i].name + "_" + this.actualusers[i].rcid }).subscribe(
        data => {
          console.log('Success', data);
          window.location.reload();
          alert('Member Added !!!');
        },
        error => console.log('Error', error),
      );
    }
    this.emptyMem = '';
    this.type = '';
    this.empty = -1;
  }

  delMember(i: number, member: string) {
    if (this.empty != -1 && this.empty == i) {
      let d1: string;
      let d2: string;
      if (member == "mem1" && this.teams[i].members.mem2 != "") {
        d1 = this.teams[i].members.mem2;
        d2 = "";
      }
      if (member == "mem2") {
        d1 = this.teams[i].members.mem1;
        d2 = "";
      }
      this._enrollment.delMemberCryptoquest({ id: this.teams[i]._id, m1: d1, m2: d2 }).subscribe(
        data => {
          console.log('Success', data);
          window.location.reload();
          alert('Member Removed !!!');
        },
        error => console.log('Error', error),
      );
    }
    this.empty = -1;
  }

  delTeam(i: number) {

    this._enrollment.delTeamCryptoquest({ id: this.teams[i]._id }).subscribe(
      data => {
        console.log('Success', data);
        window.location.reload();
        alert('Team Removed !!!');
      },
      error => console.log('Error', error),
    );

  }

  ExportToExcel(name: string) {
    this._appcomp.ExportToExcel(name, this.table, "Teams");
  }
}