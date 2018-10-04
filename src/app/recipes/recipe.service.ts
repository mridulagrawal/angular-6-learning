import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();
  modifiedRecipe = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Chicken Tikka', 'marinaed grilled tandoor chicken',
      `https://i2.wp.com/media.hungryforever.com/wp-content/uploads` +
      `/2015/12/09103934/CHicken-REcipe.jpg?ssl=1?w=356&strip=all&quality=80`,
      [
        new Ingredient('chicken Breast', 10),
        new Ingredient('Tomato', 15),
        new Ingredient('Onion', 25)
      ]),
    new Recipe('Panner Tikka', 'tandoori cottage cheese',
      'https://www.cookforindia.com/wp-content/uploads/2016/08/Paneer-Tikka-_LR-1140x500.jpg',
      [
        new Ingredient('Paneer', 5),
        new Ingredient('Tomato', 15),
        new Ingredient('Onion', 25)
      ]),
    new Recipe('Afghani Malai Tikka', 'Creamy chicken delight',
      'http://www.cooktube.in/wp-content/uploads/2017/01/afghani-chicken.jpg',
      [
        new Ingredient('chicken Breast', 10),
        new Ingredient('Cream', 15),
        new Ingredient('Love', 25)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.modifiedRecipe.next(this.getRecipes());
  }

  updateRecipe(recipe: Recipe, index: number) {
    this.recipes[index] = recipe;
    this.modifiedRecipe.next(this.getRecipes());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.modifiedRecipe.next(this.getRecipes());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.modifiedRecipe.next(this.getRecipes());
  }

}
