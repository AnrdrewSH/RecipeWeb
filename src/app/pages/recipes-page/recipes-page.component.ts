import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

class TagItem {
  public Name: string;
  
  constructor(Name: string) {
    this.Name = Name;
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
  public RecipeId: number;
  public RecipeName: string;
  public RecipeDescription: string;
  public PersonNumber: number;
  public CookingTime: number;
  public Steps: StepItem[];
  public Tags: TagItem[];
  public IngredientItems: IngredientItem[];

  constructor(
    RecipeId: number,
    RecipeName: string,
    RecipeDescription: string,
    PersonNumber: number,
    CookingTime: number,
    Steps: StepItem[],
    Tags:TagItem[],
    IngredientItems: IngredientItem[])
    {
    this.RecipeId = RecipeId;
    this.RecipeName = RecipeName;
    this.RecipeDescription = RecipeDescription;
    this.PersonNumber = PersonNumber;
    this.CookingTime = CookingTime;
    this.Steps = Steps;
    this.Tags = Tags;
    this.IngredientItems = IngredientItems;
  }
}

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css']
})
export class RecipesPageComponent implements OnInit {

  recipesDtos: RecipeDto[] = [];
  Tags: TagItem[] = [];

  private _http: HttpClient;

  constructor(http: HttpClient, private router: Router) {
    this._http = http;
  }

  async ngOnInit(): Promise<void> {
    this.recipesDtos = await this._http.get<RecipeDto[]>('/api/Recipe').toPromise()
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