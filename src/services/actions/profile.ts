import { Dispatch, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  IGetUserResponse,
  ILoginBody,
  IRegisterBody,
  ITokenResponse,
  IUpdateUserBody,
  getUser as getUserApi,
  login as loginApi,
  logout as logoutApi,
  register as registerApi,
  token,
  updateUser,
} from "../../api/auth";
import { IState } from "../../models";
import { getCookie, setCookie } from "../../utils/cookie";

export const REQUEST_PROFILE = createAction("profile/request");
export const SUCCESS_PROFILE = createAction<{ email: string; name: string }>(
  "profile/success"
);
export const ERROR_PROFILE = createAction<string>("profile/error");
export const CLEAR_PROFILE = createAction("profile/clear");

export const ACCESS_TOKEN_COOKIE = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";

export type TProfileActions = ReturnType<
  | typeof REQUEST_PROFILE
  | typeof SUCCESS_PROFILE
  | typeof ERROR_PROFILE
  | typeof CLEAR_PROFILE
>;

const EXPIRES_TOKEN = 365 * 24 * 60 * 60;

export const register = (userData: IRegisterBody) => (dispatch: Dispatch) => {
  dispatch(REQUEST_PROFILE());

  return registerApi(userData)
    .then((data) => {
      dispatch(
        SUCCESS_PROFILE({
          email: data.user.email,
          name: data.user.name,
        })
      );

      updateTokens({
        refreshToken: data.refreshToken,
        accessToken: data.accessToken,
      });

      return data;
    })
    .catch((err) => {
      dispatch(ERROR_PROFILE(err));
    });
};

export const login = (userData: ILoginBody) => (dispatch: Dispatch) => {
  dispatch(REQUEST_PROFILE());

  return loginApi(userData)
    .then((data) => {
      dispatch(
        SUCCESS_PROFILE({
          email: data.user.email,
          name: data.user.name,
        })
      );

      updateTokens({
        refreshToken: data.refreshToken,
        accessToken: data.accessToken,
      });

      return data;
    })
    .catch((err) => {
      dispatch(ERROR_PROFILE(err));
    });
};

export const logout = () => (dispatch: Dispatch) => {
  const refreshToken = window.localStorage.getItem(REFRESH_TOKEN_KEY)!;

  dispatch(REQUEST_PROFILE());

  return logoutApi({ refreshToken })
    .then(() => {
      dispatch(CLEAR_PROFILE());
      removeTokens();
    })
    .catch((err) => {
      dispatch(ERROR_PROFILE(err));
    });
};

export const getUser = createAsyncThunk<
  IGetUserResponse["user"],
  void,
  { state: IState }
>("profile/get", async (_, { dispatch, getState }) => {
  const {
    profile: { request, ...profile },
  }: IState = getState();

  if (profile.email) {
    return profile;
  }

  return withUpdateToken(() =>
    getUserApi({ accessToken: getCookie(ACCESS_TOKEN_COOKIE)! })
  ).then((data) => {
    dispatch(
      SUCCESS_PROFILE({
        email: data.user.email,
        name: data.user.name,
      })
    );

    return data.user;
  });
});

export const updateProfile =
  (user: Omit<IUpdateUserBody, "accessToken">) => (dispatch: Dispatch) => {
    dispatch(REQUEST_PROFILE());

    return withUpdateToken(() =>
      updateUser({ accessToken: getCookie(ACCESS_TOKEN_COOKIE)!, ...user })
    )
      .then(({ user }) => {
        dispatch(SUCCESS_PROFILE(user));
      })
      .catch((err) => {
        dispatch(ERROR_PROFILE(err || "Ошибка обновления пользователя"));
      });
  };

function withUpdateToken<T, U>(requestFn: (...args: U[]) => T): T {
  const accessToken = getCookie(ACCESS_TOKEN_COOKIE);
  const refreshToken = window.localStorage.getItem(REFRESH_TOKEN_KEY);

  if (!refreshToken) {
    return Promise.reject("Ошибка авторизации") as any;
  }

  return (accessToken ? (requestFn() as any) : Promise.reject<string>()).catch(
    (err: Error) => {
      if (err?.message !== "jwt expired") {
        return Promise.reject();
      }

      return token({ refreshToken })
        .catch(() => {
          removeTokens();

          return Promise.reject("Ошибка авторизации");
        })
        .then(({ refreshToken, accessToken }) => {
          updateTokens({ refreshToken, accessToken });

          return requestFn();
        });
    }
  );
}

function updateTokens({ refreshToken, accessToken }: ITokenResponse) {
  setCookie(ACCESS_TOKEN_COOKIE, accessToken, {
    expires: EXPIRES_TOKEN,
    path: "/",
  });
  window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

function removeTokens() {
  setCookie(ACCESS_TOKEN_COOKIE, "", { expires: -1, path: "/" });
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
}
