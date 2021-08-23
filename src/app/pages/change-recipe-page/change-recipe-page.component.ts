import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

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
  public name: string;
  
  constructor(name: string) {
    this.name = name;
  }
}

class StepItem {
  public stepDescription: string;

  constructor(stepDescription: string) {
    this.stepDescription = stepDescription;
  }
}

class IngredientItem {
  public ingredientItemName: string;
  public products: string;

  constructor(ingredientItemName: string, products: string) {
    this.ingredientItemName = ingredientItemName;
    this.products = products;
  }
}

var recipeDtoById: RecipeDto;

@Component({
  selector: 'app-change-recipe-page',
  templateUrl: './change-recipe-page.component.html',
  styleUrls: ['./change-recipe-page.component.css']
})
export class ChangeRecipePageComponent implements OnInit {

  recipeDtosById: RecipeDto[] = [];

  private _http: HttpClient;

  constructor(http: HttpClient, private route: ActivatedRoute, private router: Router)
  {
    this._http = http;
  }
  
  async ngOnInit(): Promise<void>
  {
    this.currentRecipeDtoId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.currentRecipeDtoId);
    recipeDtoById = await this._http.get<RecipeDto>('/api/Recipe/'+this.currentRecipeDtoId).toPromise()
    this.recipeDtosById.push(recipeDtoById);
  }
  
  currentStepItemName = '';
  Steps: StepItem[] = recipeDtoById.steps;
  
  currentTagItemName = '';
  Tags: TagItem[] = recipeDtoById.tags;

  currentIngredientItemName = '';
  currentIngredientItemProducts = '';
  IngredientItems: IngredientItem[] = recipeDtoById.ingredientItems;

  currentRecipeDtoId = recipeDtoById.recipeId;
  currentRecipeDtoName = recipeDtoById.recipeName;
  currentRecipeDtoDescription = recipeDtoById.recipeDescription;
  currentRecipeDtoPersonNumber = recipeDtoById.personNumber;
  currentRecipeDtoCookingTime = recipeDtoById.cookingTime;
  
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
