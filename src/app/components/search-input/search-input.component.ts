import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {

  Tags: Tag[] = [
    { name: 'Мясо'},
    { name: 'Деликатесы'},
    { name: 'Пироги'},
    { name: 'Рыба'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

export interface Tag {
  name: string;
}