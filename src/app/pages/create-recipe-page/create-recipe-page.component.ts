import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

class StepItem {
  public stepDescription: string;
  public StepNumber: number;

  constructor(stepDescription: string, StepNumber: number) {
    this.stepDescription = stepDescription;
    this.StepNumber = StepNumber;
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
  selector: 'app-create-recipe-page',
  templateUrl: './create-recipe-page.component.html',
  styleUrls: ['./create-recipe-page.component.css']
})
export class CreateRecipePageComponent implements OnInit {
  
  currentStepItemNumber = 1;
  currentStepItemName = '';
  Steps: StepItem[] = [];
  
  space = ' ';
  currentTagItemName = '';
  Tags: TagItem[] = [];
  StringTags: string[] =[];

  currentIngredientItemName = '';
  currentIngredientItemProducts = '';
  IngredientItems: IngredientItem[] = [];
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
    await this._http.post<void>('/api/Recipe', recipeDto).toPromise()
  }

  async deleteFormStep()
  {
    this.Steps.pop();
  }

  async addStepItem() {
    this.currentStepItemNumber = this.Steps.length + 1;
    let newStep: StepItem = new StepItem(this.currentStepItemName, this.currentStepItemNumber);

    this.Steps.push( newStep );
    this.currentStepItemName = '';
}

  async addTagItem() {
    let i = 0;
    this.StringTags = this.currentTagItemName.split(this.space);
    while (i < this.StringTags.length) { 
      this.currentTagItemName = this.StringTags[i];
      let newTag: TagItem = new TagItem(this.currentTagItemName);
      this.Tags.push( newTag );
      i++;
    }
    
    this.currentTagItemName = '';
  }

  async addIngredientItem() {
      let newIngredientItem: IngredientItem = new IngredientItem(this.currentIngredientItemName, this.currentIngredientItemProducts);

      this.IngredientItems.push( newIngredientItem );
      this.currentIngredientItemName = '';
      this.currentIngredientItemProducts = '';
  }

  async addRecipeDto()
  {
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
