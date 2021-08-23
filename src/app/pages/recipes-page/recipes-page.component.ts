import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
  recipeId: number = 15;

  private _http: HttpClient;

  constructor(http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
    this.recipeId = params['id']});
    this._http = http;
  }

  async ngOnInit(): Promise<void> {
    this.recipesDtos = await this._http.get<RecipeDto[]>('/api/Recipe').toPromise();
    console.log(this.recipesDtos);
  }

  openNewRecipe(){
    this.router.navigate(['/new_recipe']);
  }

  goToRecipeId(recipeId: number)
  {
    this.router.navigate(['/change_recipe/:id', {id: recipeId}])
  }

}