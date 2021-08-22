import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

class TagItem {
  public name: string;
  
  constructor(other: TagItem) {
    this.name = other.name;
  }
}

class StepItem {
  public StepDescription: string;

  constructor(StepDescription: string) {
    this.StepDescription = StepDescription;
  }
}

class IngredientItem {
  public IngredientItemName: string;
  public Products: string;

  constructor(IngredientItemName: string, Products: string) {
    this.IngredientItemName = IngredientItemName;
    this.Products = Products;
  }
}

class RecipeDto {
  public recipeId: number;
  public recipeName: string;
  public recipeDescription: string;
  public personNumber: number;
  public cookingTime: number;
  public steps: StepItem[];
  public tags: TagItem[];
  public ingredientItems: IngredientItem[];

  constructor(other: RecipeDto)
  {
    this.recipeId = other.recipeId;
    this.recipeName = other.recipeName;
    this.recipeDescription = other.recipeDescription;
    this.personNumber = other.personNumber;
    this.cookingTime = other.cookingTime;
    this.steps = other.steps;
    this.tags = other.tags;
    this.ingredientItems = other.ingredientItems;
  }
}

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css']
})
export class RecipesPageComponent implements OnInit {

  recipesDtos: RecipeDto[] = [];
  tags: TagItem[] = [];

  private _http: HttpClient;

  constructor(http: HttpClient, private router: Router) {
    this._http = http;
  }

  async ngOnInit(): Promise<void> {
    this.recipesDtos = await this._http.get<RecipeDto[]>('/api/Recipe').toPromise();
  }

  openNewRecipe(){
    this.router.navigate(['/new_recipe']);
  }

  goToRecipeId()
  {
    this.router.navigate(['/change_recipe'])
    // {
    //   queryParams:
    //   {
    //     'recipeName': Recipe.RecipeName, 
    //     'recipeDescription': Recipe.RecipeDescription,
    //     'personNumber': Recipe.PersonNumber,
    //     'cookingTime': Recipe.CookingTime,
    //     'Tags': Recipe.Tags,   
    //     'Steps': Recipe.Steps, 
    //     'IngredientItems': Recipe.IngredientItems
    //   },
    // })  
    // , Recipe.RecipeId
    // Recipe: RecipeDto
  }

}