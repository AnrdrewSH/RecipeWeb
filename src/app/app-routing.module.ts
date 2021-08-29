import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogElementComponent } from './components/dialog-element/dialog-element.component';
import { RecipesPageComponent } from './pages/recipes-page/recipes-page.component';
import { CreateRecipePageComponent } from './pages/create-recipe-page/create-recipe-page.component';
import { ChangeRecipePageComponent } from './pages/change-recipe-page/change-recipe-page.component';
import { FavoritesRecipePageComponent } from './pages/favorites-recipe-page/favorites-recipe-page.component';
import { RecipeInfoPageComponent } from './pages/recipe-info-page/recipe-info-page.component';

const routes: Routes = [
  {path: '', component: RecipesPageComponent},
  {path: 'new_recipe', component: CreateRecipePageComponent},
  {path: 'login', component: DialogElementComponent},
  {path: 'change_recipe/:id', component: ChangeRecipePageComponent},
  {path: 'favorites_recipes', component: FavoritesRecipePageComponent},
  {path: 'recipe_info/:id', component: RecipeInfoPageComponent}
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
