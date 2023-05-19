import { createReducer } from "@reduxjs/toolkit";
import {
  SUCCESS_PROFILE,
  REQUEST_PROFILE,
  ERROR_PROFILE,
  CLEAR_PROFILE,
} from "../actions/profile";

const initialState = {
  email: "",
  name: "",
  request: {
    error: null,
    loading: false,
    fetched: false,
  },
};

export const profileReducer = createReducer(initialState, (builder) => {
  builder.addCase(REQUEST_PROFILE, (state) => ({
    ...state,
    request: {
      ...state.request,
      loading: true,
      error: null,
    },
  }));
  builder.addCase(SUCCESS_PROFILE, (state, { payload }) => ({
    ...state,
    ...payload,
    request: {
      ...initialState.request,
      fetched: true,
    },
  }));
  builder.addCase(ERROR_PROFILE, (state, { payload }) => ({
    ...state,
    request: {
      ...state.request,
      loading: false,
      error: payload,
      fetched: true,
    },
  }));
  builder.addCase(CLEAR_PROFILE, () => initialState);
});
