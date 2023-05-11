import { createAction } from "@reduxjs/toolkit";
import { register as registerApi, login as loginApi } from "../../api/auth";

export const REQUEST_PROFILE = createAction("profile/request");
export const SUCCESS_PROFILE = createAction("profile/success");
export const ERROR_PROFILE = createAction("profile/error");

export const register = (userData) => (dispatch) => {
  dispatch(REQUEST_PROFILE());

  return registerApi(userData)
    .then((data) => {
      dispatch(
        SUCCESS_PROFILE({
          email: data.user.email,
          name: data.user.name,
          refreshToken: data.refreshToken,
        })
      );

      return data;
    })
    .catch((err) => {
      dispatch(ERROR_PROFILE(err));
    });
};

export const login = (userData) => (dispatch) => {
  dispatch(REQUEST_PROFILE());

  return loginApi(userData)
    .then((data) => {
      dispatch(
        SUCCESS_PROFILE({
          email: data.user.email,
          name: data.user.name,
          refreshToken: data.refreshToken,
        })
      );

      return data;
    })
    .catch((err) => {
      dispatch(ERROR_PROFILE(err));
    });
};
