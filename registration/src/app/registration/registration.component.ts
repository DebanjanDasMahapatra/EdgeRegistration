import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EnrollmentService } from '../enrollment.service';
import { AppComponent } from '../app.component';
import { User } from '../user';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';
import { NgProgressComponent } from '@ngx-progressbar/core';

export interface RegisterDialogData {
  userModel: User;
  editing: boolean;
}
export interface PeriodicElement {
  name: string;
  rcid: string;
  emaill: string;
  college: string;
  stream: string;
  year: string;
  contact: number;
  flawless: string;
  bughunt: string;
  cryptoquest: string;
  webdesign: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css', '../app.component.css']
})
export class RegistrationComponent implements OnInit {

  displayedColumns: string[] = ['1','2','3','4','5','6','7','8','9','10','11','12','13'];
  streams = ['CSE', 'IT', 'ECE', 'EIE', "EE", 'FT', 'BCA', 'MCA', 'CIVIL', 'ME', 'Others'];
  @ViewChild(NgProgressComponent) progBar: NgProgressComponent;
  @ViewChild('allusers') table: ElementRef;
  userModel = new User("", "", "", "", 0, "", "", { flawless: false, bughunt: false, cryptoquest: false, webdesign: false });
  userNew = new User("", "", "", "", 0, "", "", { flawless: false, bughunt: false, cryptoquest: false, webdesign: false });
  users;
  databaseError = 'Please Check Your DataBase connectivity. If you are using MongoDB at localhost, make sure it is turned on. If you are using online MongoDB server, check your internet connection.';
  serverError = 'Some Internal Server Error Occured !!! Please check the server connection';
  flag: string = '';
  dataSource = new MatTableDataSource<PeriodicElement>(this.users);
  elementData: PeriodicElement[];
  del: boolean = false;
  searchText: string = '';
  constructor(public _enrollment: EnrollmentService, public _appcomp: AppComponent, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.onQuery(true);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  startPB() {
    this.progBar.start();
  }
  endPB() {
    this.progBar.complete();
  }

  openRegisterDialog(work: boolean): void {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '600px',
      hasBackdrop: false,
      data: {userModel: this.userModel, editing: work}        
    });

    dialogRef.afterClosed().subscribe(result => {
      this.userModel = result;
      if(result.name) {
        this.startPB();
        this.onSubmit(work);
      }
        else
        this.flag = '';
    });
  }

  onSubmit(type: boolean) {
    if (!type)
      this._enrollment.enroll(this.userModel).subscribe(
        data => {
          if(data.status) {
            this.openSnackBar('Participant Registered Successfully !!!','OK');
          }
          else {
            this.openSnackBar('Participant Registration Failure !!! '+this.databaseError,'OK');
          }
          this.onQuery(false);
        },
        error => {
          this.openSnackBar(this.serverError,'OK');
          console.log(error);
        }
      );
    else
      this._enrollment.change(this.userModel, this.flag).subscribe(
        data => {
          if(data.status) {
            this.openSnackBar('Participant Data Edited Successfully !!!','OK');
          }
          else {
            this.openSnackBar('Participant Data Editing Failure !!! '+this.databaseError,'OK');
          }
          this.onQuery(false);
        },
        error => {
          this.openSnackBar(this.serverError,'OK');
          console.log(error);
        }
      );
    this.userModel = this.userNew;
    this.flag = '';
  }

  sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onDelete() {
    if (confirm('Sure to Delete ? If you delete, any of the team(s) for any event(s) having this participant as member (if any) will be also be deleted !!!')) {
      this.startPB();
      this.del = true;
      this._enrollment.deleteUser(this.flag).subscribe(
        data => {
          if(data.status) {
            this.openSnackBar('Participant Deleted Successfully !!!','OK');
            this.endPB();
          }
          else {
            this.openSnackBar('Participant Deletion Failure !!! '+this.databaseError,'OK');
            this.endPB();
          }
          this.onQuery(false);
        },
        error => {
          this.openSnackBar(this.serverError,'OK');
          this.endPB();
          console.log(error);
        }
      );
    }
  }

  onQuery(start: boolean) {
    console.log('Queried');
    this.del = false;
    this.flag = '';
    this._enrollment.fetch().subscribe(
      data => {
        if(data.status) {
          this.openSnackBar('All Participants Retrieved Successfully !!!','OK');
          this.users = data.data;
          this.elementData = this.users;
          this.dataSource = new MatTableDataSource(this.elementData);
          this.sortByKey(this.users, "name");
        }
        else {
          this.openSnackBar('Participants Retrieval Failure !!! '+this.databaseError,'OK');
          console.log(data.data);
        }
        if(!start)
          this.endPB();
      },
      error => {
        this.openSnackBar(this.serverError,'OK');
        console.log(error);
        if(!start)
          this.endPB();
      }
    );
  }

  ExportToExcel(name: string) {
    this._appcomp.ExportToExcel(name, this.table, "Participants");
  }
}
