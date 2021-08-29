import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router, ActivatedRoute} from '@angular/router';
import { RecipeDto } from 'src/app/Classes/RecipeDto';
import { StepItem } from 'src/app/Classes/StepItem';
import { TagItem } from 'src/app/Classes/TagItem';
import { IngredientItem } from 'src/app/Classes/IngredientItem';

var recipeDtoById: RecipeDto;

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css']
})
export class RecipesPageComponent implements OnInit {

  isLiked: boolean = false;
  isFavorite: boolean = false;

  MockTags: Tag[] = [
    { name: 'мясо'},
    { name: 'деликатесы'},
    { name: 'пироги'},
    { name: 'рыба'},
  ]

  Categories: Category[] = [
    { name: 'Простые блюда', photo: 'icon1.svg'},
    { name: 'Детское', photo: 'icon2.svg'},
    { name: 'От шеф поваров', photo: 'icon3.svg'},
    { name: 'На праздник', photo: 'icon4.svg' }
  ];

  currentRecipeDtoId = 0;
  currentRecipeDtoName = '';
  currentRecipeDtoDescription = '';
  currentRecipeDtoPersonNumber = 1;
  currentRecipeDtoCookingTime = 1;
  currentRecipeDtoLikes = 0;
  currentRecipeDtoIsLiked = "../../../assets/like.svg";
  currentRecipeDtoStars = 0;

  currentStepItemNumber = 1;
  currentStepItemName = '';
  steps: StepItem[] = [];

  space = ' ';
  currentTagItemName = '';
  tags: TagItem[] = [];
  StringTags: string[] =[];

  currentIngredientItemName = '';
  currentIngredientItemProducts = '';
  ingredientItems: IngredientItem[] = [];
  
  recipesDtos: RecipeDto[] = [];
  TagsForCounter: number = 0;
  recipeId: number = 0;

  searchValue = '';
  Like: any;

  private _http: HttpClient;

  constructor(http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
    this.recipeId = params['id']});
    this._http = http;
  }

  async ngOnInit(): Promise<void> {
    this.recipesDtos = await this._http.get<RecipeDto[]>('/api/Recipe').toPromise();
    
    for (let i = 0; i < this.recipesDtos.length; i++)
    {
      if (this.recipesDtos[i].likes == 0) this.recipesDtos[i].isLiked = "../../../assets/like.svg";
      else this.recipesDtos[i].isLiked = "../../../assets/PushedLike.svg";
    }

  }

  openNewRecipe(){
    this.router.navigate(['/new_recipe']);
  }

  goToPageByRecipeId(recipeId: number)
  {
    this.router.navigate(['/change_recipe/:id', {id: recipeId}])
  }

  async updateRecipeForLike(recipeId: number)
  {
    this.currentRecipeDtoId = recipeId;
    
    recipeDtoById = await this._http.get<RecipeDto>('/api/Recipe/' + this.currentRecipeDtoId).toPromise();
    this.currentRecipeDtoName = recipeDtoById.recipeName;
    this.currentRecipeDtoDescription = recipeDtoById.recipeDescription;
    this.currentRecipeDtoPersonNumber = recipeDtoById.personNumber;
    this.currentRecipeDtoCookingTime = recipeDtoById.cookingTime;
    this.currentRecipeDtoLikes = recipeDtoById.likes;
    this.currentRecipeDtoStars = recipeDtoById.stars;
    this.steps = recipeDtoById.steps;
    this.tags = recipeDtoById.tags;
    this.ingredientItems = recipeDtoById.ingredientItems;

    if (this.currentRecipeDtoLikes == 0) this.currentRecipeDtoLikes++;
    else this.currentRecipeDtoLikes--;

    let newRecipeDto: RecipeDto = new RecipeDto(
      this.currentRecipeDtoId,
      this.currentRecipeDtoName,
      this.currentRecipeDtoDescription,
      this.currentRecipeDtoPersonNumber,
      this.currentRecipeDtoCookingTime,
      this.currentRecipeDtoLikes,
      this.currentRecipeDtoIsLiked,
      this.currentRecipeDtoStars,
      this.steps,
      this.tags,
      this.ingredientItems);

    await this._http.put(`/api/Recipe/${recipeId}`, newRecipeDto).toPromise();
    this.recipesDtos = await this._http.get<RecipeDto[]>('/api/Recipe').toPromise();
    
    for (let i = 0; i < this.recipesDtos.length; i++)
    {
      if (this.recipesDtos[i].likes == 0) this.recipesDtos[i].isLiked = "../../../assets/like.svg";
      else this.recipesDtos[i].isLiked = "../../../assets/PushedLike.svg";
    }

  }

  async updateRecipeForStars(recipeId: number)
  {
    this.currentRecipeDtoId = recipeId;
    
    recipeDtoById = await this._http.get<RecipeDto>('/api/Recipe/' + this.currentRecipeDtoId).toPromise();
    this.currentRecipeDtoName = recipeDtoById.recipeName;
    this.currentRecipeDtoDescription = recipeDtoById.recipeDescription;
    this.currentRecipeDtoPersonNumber = recipeDtoById.personNumber;
    this.currentRecipeDtoCookingTime = recipeDtoById.cookingTime;
    this.currentRecipeDtoLikes = recipeDtoById.likes;
    this.currentRecipeDtoStars = recipeDtoById.stars;
    this.steps = recipeDtoById.steps;
    this.tags = recipeDtoById.tags;
    this.ingredientItems = recipeDtoById.ingredientItems;

    if (this.currentRecipeDtoStars == 0) this.currentRecipeDtoStars++, this.isFavorite = true;
    else this.currentRecipeDtoStars--, this.isFavorite = false;

    let newRecipeDto: RecipeDto = new RecipeDto(
      this.currentRecipeDtoId,
      this.currentRecipeDtoName,
      this.currentRecipeDtoDescription,
      this.currentRecipeDtoPersonNumber,
      this.currentRecipeDtoCookingTime,
      this.currentRecipeDtoLikes,
      this.currentRecipeDtoIsLiked,
      this.currentRecipeDtoStars,
      this.steps,
      this.tags,
      this.ingredientItems);

    await this._http.put(`/api/Recipe/${recipeId}`, newRecipeDto).toPromise();
    this.recipesDtos = await this._http.get<RecipeDto[]>('/api/Recipe').toPromise();

    for (let i = 0; i < this.recipesDtos.length; i++)
    {
      if (this.recipesDtos[i].likes == 0) this.recipesDtos[i].isLiked = "../../../assets/like.svg";
      else this.recipesDtos[i].isLiked = "../../../assets/PushedLike.svg";
    }

  }

  async GetRecipesByTag(nameoftag: string)
  {
    this.recipesDtos = await this._http.get<RecipeDto[]>( '/api/Recipe/findByTag/' + nameoftag ).toPromise();
    for (let i = 0; i < this.recipesDtos.length; i++)
    {
      if (this.recipesDtos[i].tags.length == 0)
      {
        delete this.recipesDtos[i];
      }
    }
  }

  async GetRecipesByName()
  {
    this.recipesDtos = await this._http.get<RecipeDto[]>( '/api/Recipe/findByName/' + this.searchValue ).toPromise();
    for (let i = 0; i < this.recipesDtos.length; i++)
    {
      if (this.recipesDtos[i].tags.length == 0)
      {
        delete this.recipesDtos[i];
      }
    }
  }

}

export interface Tag {
  name: string;
}

export interface Category {
  name: string;
  photo: string;
}