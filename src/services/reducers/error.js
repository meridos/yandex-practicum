import { createReducer } from "@reduxjs/toolkit";
import { ERROR } from "../actions/error";

const initialState = {
  overlayError: null,
};

export const errorReducer = createReducer(initialState, (builder) => {
  builder.addCase(ERROR, (state, action) => ({
    ...state,
    overlayError: action.payload,
  }));
});
