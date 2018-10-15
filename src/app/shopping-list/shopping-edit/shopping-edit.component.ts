import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AmountValidator } from '../../utils/validators';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.action';
import * as fromShoppingList from '../store/shopping-list.reducer';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  // @ViewChild('ingName') ingName: ElementRef;
  // @ViewChild('ingAmount') ingAmount: ElementRef;

  shoppingListForm: FormGroup;
  subscription: Subscription;
  editedItemIndex: number;
  editMode: Boolean = false;

  constructor(private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.shoppingListForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'amount': new FormControl(null, [Validators.required, AmountValidator.bind(this)]),
    });

    this.subscription = this.shoppingListService.ingredientToEdit.subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      const ingredient = this.shoppingListService.getIngredientByIndex(index);
      this.shoppingListForm.setValue({
        'name': ingredient.name,
        'amount': ingredient.amount
      });
    });
  }

  onSubmit() {
    const ingName = this.shoppingListForm.value.name;
    const ingAmount = this.shoppingListForm.value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if (!this.editMode) {
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredientAction(newIngredient));

    } else {
      this.store.dispatch(new ShoppingListActions.EditIngredientAction({
        index: this.editedItemIndex,
        ingredient: newIngredient
      }));
      // this.shoppingListService.editIngredient(newIngredient, this.editedItemIndex);
    }
    this.onClear();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredientAction(this.editedItemIndex));

    // this.shoppingListService.removeIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
