import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css']
})
export class RecipesPageComponent implements OnInit {

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

  currentTagItemName = '';
  recipesDtos: RecipeDto[] = [];
  Tags: TagItem[] = [];
  TagsForCounter: number = 0;
  recipeId: number = 0;

  private _http: HttpClient;

  constructor(http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
    this.recipeId = params['id']});
    this._http = http;
  }

  async ngOnInit(): Promise<void> {
    let i = 0;
    this.recipesDtos = await this._http.get<RecipeDto[]>('/api/Recipe').toPromise();
  }

  openNewRecipe(){
    this.router.navigate(['/new_recipe']);
  }

  goToPageByRecipeId(recipeId: number)
  {
    this.router.navigate(['/change_recipe/:id', {id: recipeId}])
  }

  // async SaveAndGetTags(nameoftag: string)
  // {
  //   let params = new HttpParams();
  //   params = params.append(nameoftag, nameoftag);
  //   this.recipesDtos = await this._http.get<RecipeDto[]>('/api/Recipe/nameoftag').toPromise();
  //   for (let i = 0; i < this.recipesDtos.length; i++)
  //   {
  //     if (this.recipesDtos[i].tags.length == 0)
  //     {
  //       delete this.recipesDtos[i];
  //     }
  //   }
  // }
}

export interface Tag {
  name: string;
}

export interface Category {
  name: string;
  photo: string;
}