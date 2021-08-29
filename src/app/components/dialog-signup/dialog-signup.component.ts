import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from '../dialog-login/dialog-login.component';

@Component({
  selector: 'app-dialog-signup',
  templateUrl: './dialog-signup.component.html',
  styleUrls: ['./dialog-signup.component.css']
})

export class DialogSignupComponent {

  constructor(public dialog: MatDialog) {}

  openDialogLogin() {
    this.dialog.open(DialogLoginComponent);
  } 
}
