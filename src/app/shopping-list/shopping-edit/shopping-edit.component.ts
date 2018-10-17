import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AmountValidator } from '../../utils/validators';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.action';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  shoppingListForm: FormGroup;
  subscription: Subscription;
  editMode: Boolean = false;
  editedIngredient: Ingredient;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.shoppingListForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'amount': new FormControl(null, [Validators.required, AmountValidator.bind(this)]),
    });

    this.subscription = this.store.select('shoppingList').subscribe(data => {
      if (data.editedIngredientIndex > -1) {
        this.editedIngredient = data.editedIngredient;
        this.editMode = true;
        this.shoppingListForm.setValue({
          'name': this.editedIngredient.name,
          'amount': this.editedIngredient.amount
        });
      } else {
        this.editMode = false;
      }
    })
  }

  onSubmit() {
    const ingName = this.shoppingListForm.value.name;
    const ingAmount = this.shoppingListForm.value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if (!this.editMode) {
      this.store.dispatch(new ShoppingListActions.AddIngredientAction(newIngredient));
    } else {
      this.store.dispatch(new ShoppingListActions.EditIngredientAction({
        ingredient: newIngredient
      }));
    }
    this.onClear();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredientAction());
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEditAction());
  }
}
