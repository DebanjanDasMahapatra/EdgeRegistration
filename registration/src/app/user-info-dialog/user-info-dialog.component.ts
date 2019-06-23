import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserInfoData } from '../flawless/flawless.component';

@Component({
  selector: 'app-user-info-dialog',
  templateUrl: './user-info-dialog.component.html',
  styleUrls: ['./user-info-dialog.component.css']
})
export class UserInfoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UserInfoData>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfoData) { }

  ngOnInit() {
  }

}
