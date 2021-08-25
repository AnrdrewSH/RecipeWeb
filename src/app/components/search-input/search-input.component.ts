import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {

  currentTagItemName = '';
  
  MockTags: Tag[] = [
    { name: 'мясо'},
    { name: 'деликатесы'},
    { name: 'пироги'},
    { name: 'рыба'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

  SaveTagName(name: string)
  {
    this.currentTagItemName = name;
  }
}

export interface Tag {
  name: string;
}