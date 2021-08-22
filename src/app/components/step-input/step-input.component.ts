import { Component, OnInit } from '@angular/core';

class StepItem {
  public StepDescription: string;

  constructor(StepDescription: string) {
    this.StepDescription = StepDescription;
  }
}

@Component({
  selector: 'app-step-input',
  templateUrl: './step-input.component.html',
  styleUrls: ['./step-input.component.css']
})
export class StepInputComponent implements OnInit {
  currentStepItemName = '';
  Steps: StepItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
