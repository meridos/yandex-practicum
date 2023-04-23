import { createReducer } from "@reduxjs/toolkit";
import {
  APPEND_BUN_CART,
  APPEND_INGREDIENT_CART,
  REMOVE_CART,
} from "../actions/cart";

const initialState = {
  bun: null,
  ingredients: [],
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(APPEND_BUN_CART, (state, action) => ({
      ...state,
      bun: action.payload,
    }))
    .addCase(APPEND_INGREDIENT_CART, (state, action) => ({
      ...state,
      ingredients: [...state.ingredients, action.payload],
    }))
    .addCase(REMOVE_CART, (state, action) => ({
      ...state,
      ingredients: state.ingredients.filter(
        (ingredient) => ingredient !== action.payload
      ),
    }));
});
