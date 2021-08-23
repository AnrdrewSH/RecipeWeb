import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

class StepItem {
  public StepDescription: string;

  constructor(StepDescription: string) {
    this.StepDescription = StepDescription;
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

class TagItem {
  public Name: string;
  
  constructor(Name: string) {
    this.Name = Name;
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

var recipeDtoById: RecipeDto;

@Component({
  selector: 'app-change-recipe-page',
  templateUrl: './change-recipe-page.component.html',
  styleUrls: ['./change-recipe-page.component.css']
})
export class ChangeRecipePageComponent implements OnInit {

  currentStepItemName = '';
  Steps: StepItem[] = [];
  
  currentTagItemName = '';
  Tags: TagItem[] = [];

  currentIngredientItemName = '';
  currentIngredientItemProducts = '';
  IngredientItems: IngredientItem[] = [];

  currentRecipeDtoId = 0;
  currentRecipeDtoName = '';
  currentRecipeDtoDescription = '';
  currentRecipeDtoPersonNumber = 0;
  currentRecipeDtoCookingTime = 0;

  recipeDtosById: RecipeDto[] = [];

  // private routeSubscription: Subscription;
  // private querySubscription: Subscription;

  private _http: HttpClient;

  constructor(http: HttpClient, private route: ActivatedRoute) {
    this._http = http;
    // this.routeSubscription = route.params.subscribe(params=>this.currentRecipeDtoId=params['recipeId']);
    // this.querySubscription = route.queryParams.subscribe(
    //     (queryParam: number) => {
    //         this.currentRecipeDtoId = queryParam['recipeId'];
    //     }
    // );
  }
  
  async ngOnInit(): Promise<void>
  {
    this.route.queryParams.subscribe(params => {
      this.currentRecipeDtoId = params['id'];
    });
    recipeDtoById = await this._http.get<RecipeDto>('/api/Recipe/'+this.currentRecipeDtoId).toPromise()
    this.recipeDtosById.push(recipeDtoById);
  }
  
  // async updateRecipe(recipe: RecipeDto)
  // {
  //   await this._http.put(`/api/Recipe/${recipe.recipeId}`, recipe).toPromise();
  // }

  async deleteRecipe()
  {
    await this._http.delete<RecipeDto>('/api/Recipe/'+this.currentRecipeDtoId).toPromise();
  }

  async addStepItem() {
      let newStep: StepItem = new StepItem(this.currentStepItemName);
    
      this.Steps.push( newStep );
      this.currentStepItemName = '';
  }

  async addTagItem() {
    let newTag: TagItem = new TagItem(this.currentTagItemName);

    this.Tags.push( newTag );
    this.currentTagItemName = '';
  }

  async addIngredientItem() {
      let newIngredientItem: IngredientItem = new IngredientItem(
        this.currentIngredientItemName, this.currentIngredientItemProducts);

      this.IngredientItems.push( newIngredientItem );
      this.currentIngredientItemName = '';
      this.currentIngredientItemProducts = '';
  }

}
