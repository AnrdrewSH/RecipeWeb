import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

class TagItem {
  public name: string;
  
  constructor(other: TagItem) {
    this.name = other.name;
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
  tags: TagItem[] = [];
  recipeId: number = 15;

  private _http: HttpClient;

  constructor(http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
    this.recipeId = params['id']});
    this._http = http;
  }

  async ngOnInit(): Promise<void> {
    this.recipesDtos = await this._http.get<RecipeDto[]>('/api/Recipe').toPromise();
  }

  recipesDtosForSearch = this.recipesDtos;

  openNewRecipe(){
    this.router.navigate(['/new_recipe']);
  }

  goToPageByRecipeId(recipeId: number)
  {
    this.router.navigate(['/change_recipe/:id', {id: recipeId}])
  }

  async SaveAndGetTags(nameoftag: string)
  {
    console.log(nameoftag);
    let i = 0;
    let j = 0;
    let counter = 0;
    this.currentTagItemName = nameoftag;

    for (i; i < this.recipesDtos.length; i++)
    {
      for (j; j < this.tags.length; j++)
      {
        if (this.recipesDtos[i].tags[j].name == this.currentTagItemName)
        {
          counter++;
        }       
      }
      if (counter == 0)
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