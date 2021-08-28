import { StepItem } from './StepItem';
import { TagItem } from './TagItem';
import { IngredientItem } from './IngredientItem';

// export interface RecipeDto {
//     id?: number;
//     recipeName: string;
//     recipeDescription: string;
//     personNumber: number;
//     cookingTime: number;
//     likes: number;
//     stars: number;
//     tags: Array<TagItemDto>;
//     steps: Array<StepItemDto>;
//     ingredientItems: Array<IngridientItemDto>;
// }

export class RecipeDto {
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
    tags: TagItem[],
    ingredientItems: IngredientItem[])
  {
    this.recipeId = recipeId;
    this.recipeName = recipeName;
    this.recipeDescription = recipeDescription;
    this.personNumber = personNumber;
    this.cookingTime = cookingTime;
    this.likes = likes;
    this.stars = stars;
    this.steps = steps;
    this.tags = tags;
    this.ingredientItems = ingredientItems;
  }
}
