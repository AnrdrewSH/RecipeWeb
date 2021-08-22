import { Component, OnInit } from '@angular/core';

class IngredientItem {
  public IngredientItemName: string;
  public Products: string;

  constructor(IngredientItemName: string, Products: string) {
    this.IngredientItemName = IngredientItemName;
    this.Products = Products;
  }
}

@Component({
  selector: 'app-ingredient-input',
  templateUrl: './ingredient-input.component.html',
  styleUrls: ['./ingredient-input.component.css']
})
export class IngredientInputComponent implements OnInit {
  currentIngredientItemName = '';
  currentIngredientItemProducts = '';
  IngredientItems: IngredientItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
