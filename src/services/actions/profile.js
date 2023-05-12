import { createAction } from "@reduxjs/toolkit";
import {
  getUser,
  login as loginApi,
  logout as logoutApi,
  register as registerApi,
  token,
} from "../../api/auth";
import { getCookie, setCookie } from "../../utils/cookie";

export const REQUEST_PROFILE = createAction("profile/request");
export const SUCCESS_PROFILE = createAction("profile/success");
export const ERROR_PROFILE = createAction("profile/error");
export const CLEAR_PROFILE = createAction("profile/clear");

export const ACCESS_TOKEN_COOKIE = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";

export const register = (userData) => (dispatch) => {
  dispatch(REQUEST_PROFILE());

  return registerApi(userData)
    .then((data) => {
      dispatch(
        SUCCESS_PROFILE({
          email: data.user.email,
          name: data.user.name,
        })
      );

      setCookie(ACCESS_TOKEN_COOKIE, data.accessToken);
      window.localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);

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
        })
      );

      setCookie(ACCESS_TOKEN_COOKIE, data.accessToken);
      window.localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);

      return data;
    })
    .catch((err) => {
      dispatch(ERROR_PROFILE(err));
    });
};

export const logout = () => (dispatch) => {
  const refreshToken = window.localStorage.getItem(REFRESH_TOKEN_KEY);

  dispatch(REQUEST_PROFILE());

  return logoutApi({ refreshToken })
    .then(() => {
      dispatch(CLEAR_PROFILE());
      setCookie(ACCESS_TOKEN_COOKIE, "");
      window.localStorage.setItem(REFRESH_TOKEN_KEY, "");
    })
    .catch((err) => {
      dispatch(ERROR_PROFILE(err));
    });
};

export const check = () => (dispatch) => {
  const accessToken = getCookie(ACCESS_TOKEN_COOKIE);
  const refreshToken = window.localStorage.getItem(REFRESH_TOKEN_KEY);

  if (!accessToken || !refreshToken) {
    return;
  }

  return withUpdateToken({ refreshToken }, () => getUser({ accessToken }))
    .then((data) => {
      dispatch(
        SUCCESS_PROFILE({
          email: data.user.email,
          name: data.user.name,
        })
      );

      return data;
    })
    .catch(() => {
      setCookie(ACCESS_TOKEN_COOKIE, "");
    });
};

function withUpdateToken({ refreshToken }, requestFn) {
  return requestFn().catch(() =>
    token({ refreshToken }).then(() => requestFn())
  );
}
