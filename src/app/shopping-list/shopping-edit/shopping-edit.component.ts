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

  constructor(private shoppingListService: ShoppingListService) { }

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
      this.shoppingListService.addIngredient(newIngredient);
    } else {
      this.shoppingListService.editIngredient(newIngredient, this.editedItemIndex);
    }
    this.onClear();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.removeIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
