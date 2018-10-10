import * as ShoppingListActions from './shopping-list.action';
import { Ingredient } from '../../shared/ingredient.model';

const initialState = {
    ingredients: [
        new Ingredient('Apple', 10),
        new Ingredient('Orange', 4),
        new Ingredient('Potato', 2.5),
        new Ingredient('Chicken', 100),
    ]
};

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export function shoppingListReducer(state = initialState,
    action: ShoppingListActions.ShoppingListActions) {

    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [state.ingredients, action]
            };
        default:
            return state;
    }
}
