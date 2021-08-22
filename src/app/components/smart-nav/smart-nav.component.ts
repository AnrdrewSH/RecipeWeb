import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-smart-nav',
  templateUrl: './smart-nav.component.html',
  styleUrls: ['./smart-nav.component.css']
})
export class SmartNavComponent implements OnInit {

  Categories: Category[] = [
    { name: 'Простые блюда', photo: 'icon1.svg'},
    { name: 'Детское', photo: 'icon2.svg'},
    { name: 'От шеф поваров', photo: 'icon3.svg'},
    { name: 'На праздник', photo: 'icon4.svg' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

export interface Category {
  name: string;
  photo: string;
}
