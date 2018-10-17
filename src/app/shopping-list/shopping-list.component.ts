import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from './store/shopping-list.action';
import * as fromApp from '../store/app.reducer';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  shoppingList: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.shoppingList = this.store.select('shoppingList');
  }

  editIngredient(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEditAction(index));
  }
}
