import { IResponse, request } from "../utils/request";

export interface ILoginResponse {
  user: {
    email: string;
    name: string;
  };
  refreshToken: string;
  accessToken: string;
}

export interface ILoginBody {
  email: string;
  password: string;
}

export function login({
  email,
  password,
}: ILoginBody): Promise<ILoginResponse> {
  return request<ILoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
    .catch(() => Promise.reject("Ошибка входа"))
    .then(({ success, ...data }) => data);
}

export interface IRegisterBody {
  email: string;
  password: string;
  name: string;
}

export interface IRegisterResponse {
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}

export function register({
  email,
  password,
  name,
}: IRegisterBody): Promise<IRegisterResponse> {
  return request<IRegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  })
    .catch(() => Promise.reject("Ошибка регистрации"))
    .then(({ success, ...data }) => data);
}

export interface ILogoutBody {
  refreshToken: string;
}

export interface ILogoutResponse {
  message: string;
}

export function logout({
  refreshToken,
}: ILogoutBody): Promise<IResponse<ILogoutResponse>> {
  return request<ILogoutResponse>("/auth/logout", {
    method: "POST",
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).catch(() => Promise.reject("Ошибка выхода"));
}

export interface ITokenBody {
  refreshToken: string;
}

export interface ITokenResponse {
  accessToken: string;
  refreshToken: string;
}

export function token({
  refreshToken,
}: ITokenBody): Promise<IResponse<ITokenResponse>> {
  return request<ITokenResponse>("/auth/token", {
    method: "POST",
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).catch(() => Promise.reject("Ошибка входа"));
}

export interface IGetUserBody {
  accessToken: string;
}

export interface IGetUserResponse {
  user: {
    email: string;
    name: string;
  };
}

export function getUser({
  accessToken,
}: IGetUserBody): Promise<IResponse<IGetUserResponse>> {
  return request<IGetUserResponse>("/auth/user", {
    headers: {
      authorization: accessToken,
    },
  }).catch(() => Promise.reject("Ошибка получения пользователя"));
}

export interface IUpdateUserBody {
  accessToken: string;
  email?: string;
  name?: string;
}

export interface IUpdateUserResponse {
  user: {
    email: string;
    name: string;
  };
}

export function updateUser({
  accessToken,
  ...user
}: IUpdateUserBody): Promise<IResponse<IUpdateUserResponse>> {
  return request("/auth/user", {
    method: "PATCH",
    headers: {
      authorization: accessToken,
    },
    body: JSON.stringify(user),
  });
}
