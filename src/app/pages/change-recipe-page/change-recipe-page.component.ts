import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeDto } from 'src/app/interfaces/RecipeDto';
import { StepItem } from 'src/app/interfaces/StepItem';
import { TagItem } from 'src/app/interfaces/TagItem';
import { IngredientItem } from 'src/app/interfaces/IngredientItem';
import { ProductItem } from 'src/app/interfaces/ProductItem';

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
  currentRecipeDtoLikes = 0;
  currentRecipeDtoStars = 0;

  currentStepItemNumber = 1;
  currentStepItemName = '';
  steps: StepItem[] = [];

  space = ' ';
  currentTagItemName = '';
  tags: TagItem[] = [];
  StringTags: string[] =[];

  enter = '\n'
  StringProducts: string[] = []
  currentIngredientItemName = '';
  currentProductItemName = '';
  Products: ProductItem[] = [];
  ingredientItems: IngredientItem[] = [];

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
    this.steps = recipeDtoById.steps;
    this.tags = recipeDtoById.tags;
    this.ingredientItems = recipeDtoById.ingredientItems;
    for (let i = 0; i < this.steps.length; i++)
    {
      this.steps[i].StepNumber = i + 1;
    }
  }
  
  async updateRecipe(recipe: RecipeDto)
  {
    await this._http.put(`/api/Recipe/${recipe.recipeId}`, recipe).toPromise();
    this.router.navigate(['/'])
  }

  async deleteRecipe()
  {
    await this._http.delete<RecipeDto>('/api/Recipe/' + this.currentRecipeDtoId).toPromise();
    this.router.navigate(['/'])
  }

  deleteStep(){
    this.steps.pop();
  }

  async addStepItem() {
      this.currentStepItemNumber = this.steps.length + 1;
      let newStep: StepItem = new StepItem(this.currentStepItemName, this.currentStepItemNumber);

      this.steps.push( newStep );
      this.currentStepItemName = '';
  }

  async addTagItem() {
    this.tags = [];
    let i = 0;
    this.StringTags = this.currentTagItemName.split(this.space);
    while (i < this.StringTags.length) { 
      this.currentTagItemName = this.StringTags[i];
      let newTag: TagItem = new TagItem(this.currentTagItemName);
      this.tags.push( newTag );
      i++;
    }
    
    this.currentTagItemName = '';
  }

  async addIngredientItem() {
    let i = 0;
    this.StringProducts = this.currentProductItemName.split(this.enter);
    while (i < this.StringProducts.length - 1) { 
      this.currentProductItemName = this.StringProducts[i];
      let newProductItem: ProductItem = new ProductItem(this.currentProductItemName);
      this.Products.push( newProductItem );
      i++;
    }
    let newIngredientItem: IngredientItem = new IngredientItem(this.currentIngredientItemName, this.Products)
    this.ingredientItems.push(newIngredientItem)
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
    this.currentRecipeDtoLikes,
    this.currentRecipeDtoStars,
    this.steps,
    this.tags,
    this.ingredientItems);
    
    this.updateRecipe(newRecipeDto)
  }

}
