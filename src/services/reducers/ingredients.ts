import { createReducer } from "@reduxjs/toolkit";
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_SUCCESS,
} from "../actions/ingredients";
import { IStateIngredients } from "../../models";

const initialState: IStateIngredients = {
  data: [],
  loading: false,
};

export const ingredientsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(GET_INGREDIENTS, (state) => ({
      ...state,
      loading: true,
    }))
    .addCase(GET_INGREDIENTS_SUCCESS, (state, action) => ({
      ...state,
      data: action.payload,
      loading: false,
    }))
    .addCase(GET_INGREDIENTS_ERROR, () => initialState);
});
