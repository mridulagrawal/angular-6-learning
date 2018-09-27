import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  modifiedIngredients = new Subject<Ingredient[]>();
  ingredientToEdit = new Subject<number>();

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

  getIngredientByIndex(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.modifiedIngredients.next(this.getIngredientsList());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.modifiedIngredients.next(this.getIngredientsList());
  }

  editIngredient(ingredient: Ingredient, index: number) {
    this.ingredients[index] = ingredient;
    this.modifiedIngredients.next(this.getIngredientsList());
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.modifiedIngredients.next(this.getIngredientsList());
  }
}
