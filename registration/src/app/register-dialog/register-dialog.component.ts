import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RegisterDialogData } from '../registration/registration.component';
import { User } from '../user';
import { EnrollmentService } from '../enrollment.service';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {

  constructor(private _enrollment: EnrollmentService, public dialogRef: MatDialogRef<RegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RegisterDialogData) { }
  
  streams = ['CSE', 'IT', 'ECE', 'EIE', "EE", 'FT', 'BCA', 'MCA', 'CIVIL', 'ME', 'Others'];
  hide: boolean = false;
  errorMsg: boolean = false;
  users;
  userNew = new User("", "", "", "", 0, "", "", { flawless: false, bughunt: false, cryptoquest: false, webdesign: false });
  
  ngOnInit() {
    console.log('Queried');
    this._enrollment.fetch().subscribe(
      data => {
        this.users = data.data;
      },
      error => console.log('Error', error),
    );
  }

  checkRedundancy(e: any) {
    if (this.data.userModel.rcid != "") {
      for (let i = 0; i < Object.keys(this.users).length; i++)
        if (this.data.userModel.rcid == this.users[i].rcid) {
          this.errorMsg = true;
          e.target.invalid = true;
          return;
        }
      e.target.invalid = false;
      this.errorMsg = false;
    }
  }

}
