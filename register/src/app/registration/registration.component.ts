import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { EnrollmentService } from '../enrollment.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  streams = ['CSE','IT','ECE','EIE',"EE",'FT','BCA','BBA'];
  userModel = new User("","","",0,{flawless: false,bughunt: false,cryptoquest: false, webdesign: false});
  users: {};
  constructor(private _enrollment: EnrollmentService) { }

  ngOnInit() {
    console.log('Queried');
    this._enrollment.fetch().subscribe(
      data => {
        console.log('Success', data);
        this.users = data;
      },
      error => console.log('Error', error),
    );
  }

onSubmit() {
  console.log(this.userModel);
  this._enrollment.enroll(this.userModel).subscribe(
    data => console.log('Success', data),
    error => console.log('Error', error),
  );
  this.onQuery();
}
onQuery() {
  console.log('Queried');
  this._enrollment.fetch().subscribe(
    data => {
      console.log('Success', data);
      this.users = data;
    },
    error => console.log('Error', error),
  );
}
}
