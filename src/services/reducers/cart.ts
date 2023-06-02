import { createReducer } from "@reduxjs/toolkit";
import {
  APPEND_BUN_CART,
  APPEND_INGREDIENT_CART,
  REMOVE_CART,
  SORT_CART,
  RESET_CART,
} from "../actions/cart";
import { IStateCart } from "../../models";

const initialState: IStateCart = {
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
        (ingredient) => ingredient.uuid !== action.payload
      ),
    }))
    .addCase(SORT_CART, (state, action) => {
      const prevItem = state.ingredients.find(
        ({ uuid }) => uuid === action.payload.prevUuid
      );
      const newItem = state.ingredients.find(
        ({ uuid }) => uuid === action.payload.newUuid
      );

      if (!newItem || !prevItem) return;

      const prevIndex = state.ingredients.indexOf(prevItem);
      const newIndex = state.ingredients.indexOf(newItem);

      if (prevIndex === -1 || newIndex === -1) return;

      state.ingredients.splice(prevIndex, 1, newItem);
      state.ingredients.splice(newIndex, 1, prevItem);
    })
    .addCase(RESET_CART, () => initialState);
});
