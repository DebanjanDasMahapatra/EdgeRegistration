import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { EnrollmentService } from '../enrollment.service';
import { AppComponent } from '../app.component';
import { User } from '../user';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css', '../app.component.css']
})
export class RegistrationComponent implements OnInit {

  streams = ['CSE', 'IT', 'ECE', 'EIE', "EE", 'FT', 'BCA', 'MCA', 'CIVIL', 'ME', 'Others'];
  userModel = new User("", "", "", "", 0, "", "", { flawless: false, bughunt: false, cryptoquest: false, webdesign: false });
  userNew = new User("", "", "", "", 0, "", "", { flawless: false, bughunt: false, cryptoquest: false, webdesign: false });
  users: {};
  flag: string = '';
  critical: boolean[] = [false, false, false, false];
  del: boolean = false; errorMsg: boolean = false;
  @ViewChild('allusers') table: ElementRef;
  searchText: string = '';
  constructor(private _enrollment: EnrollmentService, private _appcomp: AppComponent, private _location: Location) { }

  ngOnInit() {
    this.onQuery();
  }

  checkRedundancy(e: any) {
    if (this.userModel.rcid != "") {
      for (let i = 0; i < Object.keys(this.users).length; i++)
        if (this.userModel.rcid == this.users[i].rcid) {
          this.errorMsg = true;
          e.target.invalid = true;
          return;
        }
      e.target.invalid = false;
      this.errorMsg = false;
    }
  }

  onSubmit(event: any) {
    if (this.flag == '')
      this._enrollment.enroll(this.userModel).subscribe(
        data => {
          console.log('Success', data);
          this.ngOnInit();
          alert('Participant Registered !!!');
        },
        error => {
          console.log('Error', error)
          alert('Oops !!! Some Problem Occured !!!\n' + error);
        },
      );
    else
      this._enrollment.change(this.userModel, this.flag).subscribe(
        data => {
          console.log('Success', data);
          this.ngOnInit();
          alert('Participant Editing Done !!!');
        },
        error => console.log('Error', error),
      );
    this.userModel = this.userNew;
    this.flag = '';
    this.critical = [false, false, false, false];
    event.target.reset();
  }

  sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

onDelete() {
  if (confirm('Sure to Delete ? If you delete, any of the team(s) for any event(s) having this participant as member (if any) will be also be deleted !!!')) {
    this.del = true;
    this._enrollment.deleteUser(this.flag).subscribe(
      data => {
        console.log('Success', data);
        this.ngOnInit();
      },
      error => console.log('Error', error),
    );
  }
}

onQuery() {
  console.log('Queried');
  this.del = false;
  this.flag = '';
  this._enrollment.fetch().subscribe(
    data => {
      console.log('Success', data);
      this.users = data;
      this.sortByKey(this.users,"name");
    },
    error => console.log('Error', error),
  );
}

ExportToExcel(name: string) {
  this._appcomp.ExportToExcel(name, this.table, "Participants");
}
}
