import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  modifiedIngredients = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 10),
    new Ingredient('Orange', 4),
    new Ingredient('Potato', 2.5),
    new Ingredient('Chicken', 100),
  ];

  constructor() { }

  getIngredientsList() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.modifiedIngredients.emit(this.getIngredientsList());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.modifiedIngredients.emit(this.getIngredientsList());
  }
}
