import * as ShoppingListActions from './shopping-list.action';
import { Ingredient } from '../../shared/ingredient.model';

export interface AppState {
    'shoppingList': State;
}
export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apple', 10),
        new Ingredient('Orange', 4),
        new Ingredient('Potato', 2.5),
        new Ingredient('Chicken', 100)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState,
    action: ShoppingListActions.ShoppingListActions) {

    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };

        case ShoppingListActions.EDIT_INGREDIENT:
            const ingredientToEdit = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredientToEdit,
                ...action.payload.ingredient
            };
            const ingredients = state.ingredients;
            ingredients[state.editedIngredientIndex] = updatedIngredient;
            return {
                ...state,
                ingredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };

        case ShoppingListActions.DELETE_INGREDIENT:
            const OldIngredients = state.ingredients;
            OldIngredients.splice(state.editedIngredientIndex, 1);
            return {
                ...state,
                ingredients: OldIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };

        case ShoppingListActions.START_EDIT:
            const editedIngredient = { ...state.ingredients[action.payload] };
            return {
                ...state,
                editedIngredient: editedIngredient,
                editedIngredientIndex: action.payload
            };

        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };

        default:
            return state;
    }
}
