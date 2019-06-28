import { Component, OnInit, Inject } from '@angular/core';
import { Credentials } from '../credentials';
import { LoginDialogData } from '../navbar/navbar.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-admin-login-dialog',
  templateUrl: './admin-login-dialog.component.html',
  styleUrls: ['./admin-login-dialog.component.css']
})
export class AdminLoginDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AdminLoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginDialogData) { }

  hide: boolean = false;
  credentials = new Credentials('','');

  ngOnInit() {
  }

}
