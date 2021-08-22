import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

class StepItem {
  public StepDescription: string;

  constructor(StepDescription: string) {
    this.StepDescription = StepDescription;
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
  selector: 'app-form-change-recipe',
  templateUrl: './form-change-recipe.component.html',
  styleUrls: ['./form-change-recipe.component.css']
})
export class FormChangeRecipeComponent implements OnInit {

  currentStepItemName = '';
  Steps: StepItem[] = [];
  
  currentTagItemName = '';
  Tags: TagItem[] = [];

  currentIngredientItemName = '';
  currentIngredientItemProducts = '';
  IngredientItems: IngredientItem[] = [];

  currentRecipeDtoId = 9;
  currentRecipeDtoName = '';
  currentRecipeDtoDescription = '';
  currentRecipeDtoPersonNumber = 0;
  currentRecipeDtoCookingTime = 0;

  recipeDtosById: RecipeDto[] = [];

  private _http: HttpClient;

  constructor(http: HttpClient) {
    this._http = http;
  }
  
  async ngOnInit(): Promise<void>
  {
    recipeDtoById = await this._http.get<RecipeDto>('/api/Recipe/'+this.currentRecipeDtoId).toPromise()
    this.recipeDtosById.push(recipeDtoById);
  }
  
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
      let newIngredientItem: IngredientItem = new IngredientItem(this.currentIngredientItemName, this.currentIngredientItemProducts);

      this.IngredientItems.push( newIngredientItem );
      this.currentIngredientItemName = '';
      this.currentIngredientItemProducts = '';
  }
   
}
