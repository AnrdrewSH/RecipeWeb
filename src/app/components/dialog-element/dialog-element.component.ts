import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogOptionsComponent} from '../dialog-options/dialog-options.component';

@Component({
  selector: 'app-dialog-element',
  templateUrl: './dialog-element.component.html',
  styleUrls: ['./dialog-element.component.css']
})
export class DialogElementComponent {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogOptionsComponent);
  } 
}