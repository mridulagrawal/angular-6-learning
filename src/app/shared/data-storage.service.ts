import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: Http,
    private recipeService: RecipeService,
    private authService: AuthService) { }

  storeRecipes() {
    return this.http.put('https://ng-recipe-book-9b8b7.firebaseio.com/recipes.json',
      this.recipeService.getRecipes());
  }

  fetchRecipes() {
    const token = this.authService.getToken();
    this.http.get('https://ng-recipe-book-9b8b7.firebaseio.com/recipes.json?auth=' + token)
      .pipe(map((response: Response) => {
        const recipes: Recipe[] = response.json();
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe.ingredients = [];
          }
        }
        return recipes;
      }))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
