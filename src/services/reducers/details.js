import { createReducer } from "@reduxjs/toolkit";
import { CLOSE_DETAILS, OPEN_DETAILS } from "../actions/details";

const initialState = {
  ingredient: null,
};

export const detailsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(OPEN_DETAILS, (state, action) => ({
      ...state,
      ingredient: action.payload,
    }))
    .addCase(CLOSE_DETAILS, (state, action) => ({
      ...state,
      ingredient: null,
    }));
});
