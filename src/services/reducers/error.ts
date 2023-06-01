import { createReducer } from "@reduxjs/toolkit";
import { IStateError } from "../../models";
import { ERROR } from "../actions/error";

const initialState: IStateError = {
  overlayError: null,
};

export const errorReducer = createReducer(initialState, (builder) => {
  builder.addCase(ERROR, (state, action) => ({
    ...state,
    overlayError: action.payload,
  }));
});
