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

  constructor(
    recipeId: number,
    recipeName: string,
    recipeDescription: string,
    personNumber: number,
    cookingTime: number,
    steps: StepItem[],
    tags:TagItem[],
    ingredientItems: IngredientItem[])
  {
    this.recipeId = recipeId;
    this.recipeName = recipeName;
    this.recipeDescription = recipeDescription;
    this.personNumber = personNumber;
    this.cookingTime = cookingTime;
    this.steps = steps;
    this.tags = tags;
    this.ingredientItems = ingredientItems;
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
  public StepNumber: number;

  constructor(stepDescription: string, StepNumber: number) {
    this.stepDescription = stepDescription;
    this.StepNumber = StepNumber;
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
  
  currentRecipeDtoName = '';
  currentRecipeDtoDescription = '';
  currentRecipeDtoPersonNumber = 1;
  currentRecipeDtoCookingTime = 1;

  currentStepItemNumber = 1;
  currentStepItemName = '';
  Steps: StepItem[] = [];
  
  currentTagItemName = '';
  Tags: TagItem[] = [];

  currentIngredientItemName = '';
  currentIngredientItemProducts = '';
  IngredientItems: IngredientItem[] = [];

  currentRecipeDtoId = 0;

  async ngOnInit(): Promise<void>
  {
    this.currentRecipeDtoId = Number(this.route.snapshot.paramMap.get('id'));
    recipeDtoById = await this._http.get<RecipeDto>('/api/Recipe/' + this.currentRecipeDtoId).toPromise();
    this.recipeDtosById.push(recipeDtoById);
    this.currentRecipeDtoName = recipeDtoById.recipeName;
    this.currentRecipeDtoDescription = recipeDtoById.recipeDescription;
    this.currentRecipeDtoPersonNumber = recipeDtoById.personNumber;
    this.currentRecipeDtoCookingTime = recipeDtoById.cookingTime;
    this.Steps = recipeDtoById.steps;
    this.Tags = recipeDtoById.tags;
    this.IngredientItems = recipeDtoById.ingredientItems;
  }
  
  async updateRecipe(recipe: RecipeDto)
  {
    await this._http.put(`/api/Recipe/${recipe.recipeId}`, recipe).toPromise();
    console.log(recipe);
  }

  async deleteRecipe()
  {
    await this._http.delete<RecipeDto>('/api/Recipe/' + this.currentRecipeDtoId).toPromise();
  }

  async addStepItem() {
      this.currentStepItemNumber = this.Steps.length + 1;
      let newStep: StepItem = new StepItem(this.currentStepItemName, this.currentStepItemNumber);

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

  async ChangeRecipeDto()
  {
    this.addTagItem();
    let newRecipeDto: RecipeDto = new RecipeDto(
    this.currentRecipeDtoId,
    this.currentRecipeDtoName,
    this.currentRecipeDtoDescription,
    this.currentRecipeDtoPersonNumber,
    this.currentRecipeDtoCookingTime,
    this.Steps,
    this.Tags,
    this.IngredientItems);
    
    this.updateRecipe(newRecipeDto)
  }

}
