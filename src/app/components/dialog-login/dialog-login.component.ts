import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogSignupComponent } from '../dialog-signup/dialog-signup.component';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.css']
})
export class DialogLoginComponent {

  constructor(public dialog: MatDialog) {}

  openDialogSignUp() {
    this.dialog.open(DialogSignupComponent);
  }
}