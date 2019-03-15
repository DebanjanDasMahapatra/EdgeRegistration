import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../enrollment.service';
import { Flawless } from '../flawless';

@Component({
  selector: 'app-flawless',
  templateUrl: './flawless.component.html',
  styleUrls: ['./flawless.component.css']
})
export class FlawlessComponent implements OnInit {

  users: {};
  actualusers = [];
  teams: {};
  constructor(private _enrollment: EnrollmentService) { }

  i: number;
  datasize: number;
  teamNum: number;
  members = [];
  done: boolean;
  teamsize: number = 3;
  userModel = new Flawless("","",{mem1: "",mem2: "",mem3: ""});

  ngOnInit() {
    this.i=0;
    this.done=false;
  console.log('Queried');
  this.onQuery();
  }

  checkExistance(v: string){
    for(let k=0; k<this.teamNum; k++) {
      if(v == this.teams[k].members.mem1 || v == this.teams[k].members.mem2 || v == this.teams[k].members.mem3)
        return true;
    }
    return false;
  }

  checkTeam(v,index) {
    if(v.target.checked)
      this.i++;
    else
      this.i--;
    this.done=(this.i == this.teamsize);
    this.members[index].selected=v.target.checked;
  }

  onSubmit() {
    for(let k=0; k<this.datasize; k++) {
      if(this.members[k].selected && this.i==3) {
        this.userModel.members.mem1 = this.members[k].name;
        this.i--;
      }
      else if(this.members[k].selected && this.i==2) {
        this.userModel.members.mem2 = this.members[k].name;
        this.i--;
      }
      else if(this.members[k].selected && this.i==1) {
        this.userModel.members.mem3 = this.members[k].name;
        this.i--;
      }
    }
    console.log(this.userModel);
    this._enrollment.teamUpFlawless(this.userModel).subscribe(
      data => { console.log('Success', data);
      this.onQuery(); },
      error => console.log('Error', error),
    );
  }

  onQuery() {
    this.members = [];
    this.actualusers = [];
    this._enrollment.fetchFlawlessTeam().subscribe(
      data => {
        console.log('Success', data);
        this.teams = data;
        this.teamNum = Object.keys(data).length;
      },
      error => console.log('Error', error),
    );

    this._enrollment.fetchFlawless().subscribe(
      data => {
        console.log('Success', data);
        this.users = data;
        this.datasize = Object.keys(data).length;
        for(let k=0; k<this.datasize; k++) {
          let val = {selected: false, name: this.users[k].name};
          if(!this.checkExistance(this.users[k].name)) {
            this.actualusers.push(data[k]);
          }
          (this.members).push(val);
        }
      },
      error => console.log('Error', error),
    );
  }
}
