import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeDto } from 'src/app/Classes/RecipeDto';
import { StepItem } from 'src/app/Classes/StepItem';
import { TagItem } from 'src/app/Classes/TagItem';
import { IngredientItem } from 'src/app/Classes/IngredientItem';
import { ProductItem } from 'src/app/Classes/ProductItem';

var recipeDtoById: RecipeDto;

@Component({
  selector: 'app-recipe-info-page',
  templateUrl: './recipe-info-page.component.html',
  styleUrls: ['./recipe-info-page.component.css']
})
export class RecipeInfoPageComponent implements OnInit {

  recipeDtosById: RecipeDto[] = [];

  private _http: HttpClient;

  constructor(http: HttpClient, private route: ActivatedRoute, private router: Router)
  {
    this.route.queryParams.subscribe(params => {
    this.currentRecipeDtoId = params['id']});
    this._http = http;
  }
  
  currentRecipeDtoName = '';
  currentRecipeDtoDescription = '';
  currentRecipeDtoPersonNumber = 1;
  currentRecipeDtoCookingTime = 1;
  currentRecipeDtoLikes = 0;
  currentRecipeDtoStars = 0;
  currentRecipeDtoIsLiked = "../../../assets/like.svg";

  currentStepItemNumber = 1;
  currentStepItemName = '';
  steps: StepItem[] = [];

  currentTagItemName = '';
  Tags: TagItem[] = [];
  StringTags: string[] =[];

  StringProducts: string[] = []
  currentIngredientItemName = '';
  currentProductItemName = '';
  Products: ProductItem[] = [];
  IngredientItems: IngredientItem[] = [];

  currentRecipeDtoId = 0;

  async ngOnInit(): Promise<void>
  {
    this.currentRecipeDtoId = Number(this.route.snapshot.paramMap.get('id'));
    recipeDtoById = await this._http.get<RecipeDto>('/api/Recipe/' + this.currentRecipeDtoId).toPromise();
    this.currentRecipeDtoName = recipeDtoById.recipeName;
    this.currentRecipeDtoDescription = recipeDtoById.recipeDescription;
    this.currentRecipeDtoPersonNumber = recipeDtoById.personNumber;
    this.currentRecipeDtoCookingTime = recipeDtoById.cookingTime;
    this.currentRecipeDtoLikes = recipeDtoById.likes;
    this.currentRecipeDtoStars = recipeDtoById.stars;
    for (let i = 0; i < recipeDtoById.steps.length; i++)
    {
      let newStepNumber = i + 1;
      let newStep: StepItem = new StepItem(recipeDtoById.steps[i].stepDescription, newStepNumber)
      this.steps.push(newStep);
    }
    this.Tags = recipeDtoById.tags;
    this.IngredientItems = recipeDtoById.ingredientItems;
    // let newRecipeDto: RecipeDto = new RecipeDto(this.currentRecipeDtoId, 
    //   this.currentRecipeDtoName, 
    //   this.currentRecipeDtoDescription,
    //   this.currentRecipeDtoPersonNumber,
    //   this.currentRecipeDtoCookingTime,
    //   this.currentRecipeDtoLikes,
    //   this.currentRecipeDtoIsLiked,
    //   this.currentRecipeDtoStars,
    //   this.steps,
    //   this.Tags,
    //   this.IngredientItems)
    
    console.log(this.steps);
  }
  
  async goBack()
  {
    this.router.navigate(['/']);
  }

  async goToUpdateRecipe()
  {
    this.router.navigate(['/change_recipe/:id', {id: this.currentRecipeDtoId}]);
  }

  async deleteRecipe()
  {
    await this._http.delete<RecipeDto>('/api/Recipe/' + this.currentRecipeDtoId).toPromise();
    this.router.navigate(['/'])
  }

}
