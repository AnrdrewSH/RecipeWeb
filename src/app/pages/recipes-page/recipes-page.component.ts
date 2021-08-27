import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute} from '@angular/router';

class TagItem {
  public name: string;
  
  constructor(name: string) {
    this.name = name;
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
  public likes: number;
  public stars: number;
  public steps: StepItem[];
  public tags: TagItem[];
  public ingredientItems: IngredientItem[];

  constructor(
    recipeId: number,
    recipeName: string,
    recipeDescription: string,
    personNumber: number,
    cookingTime: number,
    likes: number,
    stars: number,
    steps: StepItem[],
    tags:TagItem[],
    ingredientItems: IngredientItem[])
  {
    this.recipeId = recipeId;
    this.recipeName = recipeName;
    this.recipeDescription = recipeDescription;
    this.personNumber = personNumber;
    this.cookingTime = cookingTime;
    this.likes = likes
    this.stars = stars
    this.steps = steps;
    this.tags = tags;
    this.ingredientItems = ingredientItems;
  }
}

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
  currentRecipeDtoStars = 0;

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
  
  recipesDtos: RecipeDto[] = [];
  TagsForCounter: number = 0;
  recipeId: number = 0;

  searchValue = '';
  private _http: HttpClient;

  constructor(http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
    this.recipeId = params['id']});
    this._http = http;
  }

  async ngOnInit(): Promise<void> {
    this.recipesDtos = await this._http.get<RecipeDto[]>('/api/Recipe').toPromise();
    if (this.currentRecipeDtoLikes == 0) this.isLiked = false;
    else this.isLiked == true;
    if (this.currentRecipeDtoStars == 0) this.isFavorite = false;
    else this.isFavorite == true;
    
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
    this.Steps = recipeDtoById.steps;
    this.Tags = recipeDtoById.tags;
    this.IngredientItems = recipeDtoById.ingredientItems;

    if (this.currentRecipeDtoLikes == 0) this.currentRecipeDtoLikes++, this.isLiked = true;
    else this.currentRecipeDtoLikes--, this.isLiked = false;

    let newRecipeDto: RecipeDto = new RecipeDto(
      this.currentRecipeDtoId,
      this.currentRecipeDtoName,
      this.currentRecipeDtoDescription,
      this.currentRecipeDtoPersonNumber,
      this.currentRecipeDtoCookingTime,
      this.currentRecipeDtoLikes,
      this.currentRecipeDtoStars,
      this.Steps,
      this.Tags,
      this.IngredientItems);

    await this._http.put(`/api/Recipe/${recipeId}`, newRecipeDto).toPromise();
    this.recipesDtos = await this._http.get<RecipeDto[]>('/api/Recipe').toPromise();
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
    this.Steps = recipeDtoById.steps;
    this.Tags = recipeDtoById.tags;
    this.IngredientItems = recipeDtoById.ingredientItems;

    if (this.currentRecipeDtoStars == 0) this.currentRecipeDtoStars++, this.isFavorite = true;
    else this.currentRecipeDtoStars--, this.isFavorite = false;

    let newRecipeDto: RecipeDto = new RecipeDto(
      this.currentRecipeDtoId,
      this.currentRecipeDtoName,
      this.currentRecipeDtoDescription,
      this.currentRecipeDtoPersonNumber,
      this.currentRecipeDtoCookingTime,
      this.currentRecipeDtoLikes,
      this.currentRecipeDtoStars,
      this.Steps,
      this.Tags,
      this.IngredientItems);

    await this._http.put(`/api/Recipe/${recipeId}`, newRecipeDto).toPromise();
    this.recipesDtos = await this._http.get<RecipeDto[]>('/api/Recipe').toPromise();
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