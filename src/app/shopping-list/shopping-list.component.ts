import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import * as fromShoppingList from './store/shopping-list.reducer';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  // private subscription: Subscription;
  shoppingList: Observable<{ ingredients: Ingredient[] }>;

  constructor(private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.shoppingList = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredientsList();
    // this.subscription = this.shoppingListService.modifiedIngredients.subscribe((ingredients: Ingredient[]) => {
    //   this.ingredients = ingredients;
    // });
  }

  editIngredient(index: number) {
    this.shoppingListService.ingredientToEdit.next(index);
  }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
