import { Component, OnInit, Inject } from '@angular/core';
import { Admin } from '../admin';
import { AdminRegisterDialogData } from '../navbar/navbar.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-admin-register-dialog',
  templateUrl: './admin-register-dialog.component.html',
  styleUrls: ['./admin-register-dialog.component.css']
})
export class AdminRegisterDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AdminRegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdminRegisterDialogData) { }

  hide: boolean = false;
  admin = new Admin('','','');
  hide2: boolean = false;
  resetData = {
    user: this.admin,
    secret: ''
  }

  ngOnInit() {
  }

}
