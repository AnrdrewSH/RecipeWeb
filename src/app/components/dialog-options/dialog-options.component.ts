import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from '../dialog-login/dialog-login.component';
import { DialogSignupComponent } from '../dialog-signup/dialog-signup.component';

@Component({
  selector: 'app-dialog-options',
  templateUrl: './dialog-options.component.html',
  styleUrls: ['./dialog-options.component.css']
})
export class DialogOptionsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialogLogin() {
    this.dialog.open(DialogLoginComponent);
  } 
  openDialogSignUp() {
    this.dialog.open(DialogSignupComponent);
  }

}
