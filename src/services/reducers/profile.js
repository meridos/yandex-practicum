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
  refreshToken: null,
  request: {
    error: null,
    loading: false,
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
  builder.addCase(
    SUCCESS_PROFILE,
    (state, { payload: { email, name, refreshToken, accessToken } }) => ({
      ...state,
      email,
      name,
      refreshToken,
      accessToken,
      request: {
        ...initialState.request,
      },
    })
  );
  builder.addCase(ERROR_PROFILE, (state, { payload }) => ({
    ...state,
    request: {
      ...state.request,
      loading: false,
      error: payload,
    },
  }));
  builder.addCase(CLEAR_PROFILE, () => initialState);
});
