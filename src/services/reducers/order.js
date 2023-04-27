import { createReducer } from "@reduxjs/toolkit";
import {
  CLOSE_ORDER,
  CREATE_ORDER,
  CREATE_ORDER_ERROR,
  CREATE_ORDER_SUCCESS,
  OPEN_ORDER,
} from "../actions/order";

const initialState = {
  data: null,
  loading: false,
  error: false,
  open: false,
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(CREATE_ORDER, (state) => ({
      ...state,
      loading: true,
      error: false,
    }))
    .addCase(CREATE_ORDER_SUCCESS, (state, action) => ({
      ...state,
      data: action.payload,
      loading: false,
    }))
    .addCase(CREATE_ORDER_ERROR, (state, action) => ({
      ...initialState,
      ...initialState,
      error: action.payload,
    }))
    .addCase(OPEN_ORDER, (state) => ({
      ...state,
      open: true,
    }))
    .addCase(CLOSE_ORDER, (state) => ({
      ...state,
      open: false,
    }));
});
