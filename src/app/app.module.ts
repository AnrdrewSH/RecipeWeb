import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogElementComponent } from './components/dialog-element/dialog-element.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RecipesPageComponent } from '../app/pages/recipes-page/recipes-page.component';
import { DialogLoginComponent } from './components/dialog-login/dialog-login.component';
import { DialogSignupComponent } from './components/dialog-signup/dialog-signup.component';
import { CreateRecipePageComponent } from './pages/create-recipe-page/create-recipe-page.component';
import { DialogOptionsComponent } from './components/dialog-options/dialog-options.component';
import { RecipeService } from './services/recipe.service';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ChangeRecipePageComponent } from './pages/change-recipe-page/change-recipe-page.component';
import { FavoritesRecipePageComponent } from './pages/favorites-recipe-page/favorites-recipe-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogElementComponent,
    HeaderComponent,
    FooterComponent,
    RecipesPageComponent,
    DialogLoginComponent,
    DialogSignupComponent,
    CreateRecipePageComponent,
    DialogOptionsComponent,
    ChangeRecipePageComponent,
    FavoritesRecipePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatDialogModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatInputModule,
    HttpClientModule,
    FormsModule 
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
