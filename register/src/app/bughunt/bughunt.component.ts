import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../enrollment.service';

@Component({
  selector: 'app-bughunt',
  templateUrl: './bughunt.component.html',
  styleUrls: ['./bughunt.component.css']
})
export class BughuntComponent implements OnInit {

  users: {};
  constructor(private _enrollment: EnrollmentService) { }

  ngOnInit() {
    console.log('Queried');
    this._enrollment.fetchBughunt().subscribe(
      data => {
        console.log('Success', data);
        this.users = data;
      },
      error => console.log('Error', error),
    );
  }

}
