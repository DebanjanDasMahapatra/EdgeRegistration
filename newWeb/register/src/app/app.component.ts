import { Component } from '@angular/core';
import { EnrollmentService } from './enrollment.service';
import { User } from './user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'register';
  streams = ['CSE','IT','ECE','EIE',"EE",'FT','BCA','BBA'];
  userModel = new User("","","",0);
  users: {};

  constructor(private _enrollment: EnrollmentService) { }

  onSubmit() {
    console.log(this.userModel);
    this._enrollment.enroll(this.userModel).subscribe(
      data => console.log('Success', data),
      error => console.log('Error', error),
    )
  }
  onQuery() {
    console.log('Queried');
    this._enrollment.fetch().subscribe(
      data => {
        console.log('Success', data);
        this.users = data;
      },
      error => console.log('Error', error),
    )
  }
}
