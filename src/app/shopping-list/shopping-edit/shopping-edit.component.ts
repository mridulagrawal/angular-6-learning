import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('ingName') ingName: ElementRef;
  @ViewChild('ingAmount') ingAmount: ElementRef;
  @Output() ingredient = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  onAddItem() {
    const ingName = this.ingName.nativeElement.value;
    const ingAmount = this.ingAmount.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.ingredient.emit(newIngredient);
  }

}
