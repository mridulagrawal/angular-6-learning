import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() selectedRecipe = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Chicken Tikka', 'marinaed grilled tandoor chicken',
      'https://i2.wp.com/media.hungryforever.com/wp-content/uploads/2015/12/09103934/CHicken-REcipe.jpg?ssl=1?w=356&strip=all&quality=80'),
    new Recipe('Panner Tikka', 'tandoori cottage cheese',
      'https://www.cookforindia.com/wp-content/uploads/2016/08/Paneer-Tikka-_LR-1140x500.jpg'),
    new Recipe('Afghani Malai Tikka', 'Creamy chicken delight',
      'http://www.cooktube.in/wp-content/uploads/2017/01/afghani-chicken.jpg')
  ];
  constructor() { }

  ngOnInit() {
  }

  setRecipe(recipe: Recipe) {
    this.selectedRecipe.emit(recipe);
  }
}
