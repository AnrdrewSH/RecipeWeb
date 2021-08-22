import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

class StepItem {
  public StepDescription: string;

  constructor(StepDescription: string) {
    this.StepDescription = StepDescription;
  }
}

class RecipeDto {
  public RecipeId: number | undefined;
  public RecipeName: string;
  public RecipeDescription: string;
  public PersonNumber: number;
  public CookingTime: number;
  public Steps: StepItem[];
  public Tags: TagItem[];
  public IngredientItems: IngredientItem[];

  constructor(
    RecipeName: string,
    RecipeDescription: string,
    PersonNumber: number,
    CookingTime: number,
    Steps: StepItem[],
    Tags:TagItem[],
    IngredientItems: IngredientItem[])
    {
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

@Component({
  selector: 'app-form-new-recipe',
  templateUrl: './form-new-recipe.component.html',
  styleUrls: ['./form-new-recipe.component.css']
})

export class FormNewRecipeComponent implements OnInit {
  currentStepItemName = '';
  Steps: StepItem[] = [];
  
  currentTagItemName = '';
  Tags: TagItem[] = [];

  currentIngredientItemName = '';
  currentIngredientItemProducts = '';
  IngredientItems: IngredientItem[] = [];
  //input параметры
  currentRecipeDtoName = '';
  currentRecipeDtoDescription = '';
  currentRecipeDtoPersonNumber = 0;
  currentRecipeDtoCookingTime = 0;

  recipeDtos: RecipeDto[] = [];

  private _http: HttpClient;

  constructor(http: HttpClient) {
    this._http = http;
  }

  
  async ngOnInit(): Promise<void> {
  }

  async addRecipe(recipeDto: RecipeDto): Promise<void>{
    console.log(recipeDto);
    await this._http.post<void>('/api/Recipe', recipeDto).toPromise()
  }

  async addStepItem() {
      let newStep: StepItem = new StepItem(this.currentStepItemName);
    
      this.Steps.push( newStep );
      this.currentStepItemName = '';
      console.log( this.Steps );
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
      console.log( this.IngredientItems );
  }

  async addRecipeDto() {
    this.Steps.splice(0, 1);
    this.IngredientItems.splice(0, 1);
    this.addTagItem();
    let newRecipeDto: RecipeDto = new RecipeDto(
    this.currentRecipeDtoName,
    this.currentRecipeDtoDescription,
    this.currentRecipeDtoPersonNumber,
    this.currentRecipeDtoCookingTime,
    this.Steps,
    this.Tags,
    this.IngredientItems);
        
    this.addRecipe(newRecipeDto);        
    this.recipeDtos.push( newRecipeDto );
    this.currentRecipeDtoName = '';
    this.currentRecipeDtoDescription = '';
    this.currentRecipeDtoPersonNumber = 0;
    this.currentRecipeDtoCookingTime = 0;
    this.Steps = [];
    this.Tags = [];
    this.IngredientItems = [];
  }
}