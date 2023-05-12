import { createAction } from "@reduxjs/toolkit";
import {
  getUser,
  login as loginApi,
  logout as logoutApi,
  register as registerApi,
  token,
  updateUser,
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

      setCookie(ACCESS_TOKEN_COOKIE, data.accessToken, {
        expires: 20 * 60,
        path: "/",
      });
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

      setCookie(ACCESS_TOKEN_COOKIE, data.accessToken, {
        expires: 20 * 60,
        path: "/",
      });
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
      setCookie(ACCESS_TOKEN_COOKIE, "", { expires: -1, path: "/" });
      window.localStorage.removeItem(REFRESH_TOKEN_KEY);
    })
    .catch((err) => {
      dispatch(ERROR_PROFILE(err));
    });
};

export const check = () => (dispatch) => {
  const refreshToken = window.localStorage.getItem(REFRESH_TOKEN_KEY);

  if (!refreshToken) {
    return;
  }

  return withUpdateToken({ refreshToken }, () =>
    getUser({ accessToken: getCookie(ACCESS_TOKEN_COOKIE) })
  ).then((data) => {
    dispatch(
      SUCCESS_PROFILE({
        email: data.user.email,
        name: data.user.name,
      })
    );

    return data;
  });
};

export const updateProfile = (user) => (dispatch) => {
  const accessToken = getCookie(ACCESS_TOKEN_COOKIE);

  dispatch(REQUEST_PROFILE());

  return updateUser({ accessToken, ...user })
    .then(({ user }) => {
      dispatch(SUCCESS_PROFILE(user));
    })
    .catch((err) => {
      dispatch(ERROR_PROFILE(err));
    });
};

function withUpdateToken({ refreshToken }, requestFn) {
  const accessToken = getCookie(ACCESS_TOKEN_COOKIE);

  return (accessToken ? requestFn() : Promise.reject()).catch(() =>
    token({ refreshToken })
      .catch(() => {
        removeTokens();

        return Promise.reject("Ошибка входа");
      })
      .then(({ refreshToken, accessToken }) => {
        updateTokens({ refreshToken, accessToken });

        return requestFn();
      })
  );
}

function updateTokens({ refreshToken, accessToken }) {
  setCookie(ACCESS_TOKEN_COOKIE, accessToken, {
    expires: 20 * 60,
    path: "/",
  });
  window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

function removeTokens() {
  setCookie(ACCESS_TOKEN_COOKIE, "", { expires: -1, path: "/" });
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
}
