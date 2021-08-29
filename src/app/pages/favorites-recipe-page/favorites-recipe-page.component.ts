import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { RecipeDto } from 'src/app/Classes/RecipeDto';
import { StepItem } from 'src/app/Classes/StepItem';
import { TagItem } from 'src/app/Classes/TagItem';
import { IngredientItem } from 'src/app/Classes/IngredientItem';

@Component({
  selector: 'app-favorites-recipe-page',
  templateUrl: './favorites-recipe-page.component.html',
  styleUrls: ['./favorites-recipe-page.component.css']
})
export class FavoritesRecipePageComponent implements OnInit {

  isLiked: boolean = false;
  isFavorite: boolean = false;

  currentRecipeDtoId = 0;
  currentRecipeDtoName = '';
  currentRecipeDtoDescription = '';
  currentRecipeDtoPersonNumber = 1;
  currentRecipeDtoCookingTime = 1;
  currentRecipeDtoLikes = 0;
  currentRecipeDtoStars = 0;

  currentTagItemName = '';
  tags: TagItem[] = [];
  StringTags: string[] =[];
  
  recipesDtos: RecipeDto[] = [];

  private _http: HttpClient;

  constructor(http: HttpClient) {
    this._http = http;
  }

  async ngOnInit(): Promise<void> {
    this.recipesDtos = await this._http.get<RecipeDto[]>('/api/Recipe/findByFavorite').toPromise();
  }
}
