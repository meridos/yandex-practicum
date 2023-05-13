import request from "../utils/request";

export function login({ email, password }) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
    .catch(() => Promise.reject("Ошибка входа"))
    .then(({ success, ...data }) => data);
}

export function register({ email, password, name }) {
  return request("/auth/register", {
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

export function logout({ refreshToken }) {
  return request("/auth/logout", {
    method: "POST",
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).catch(() => Promise.reject("Ошибка выхода"));
}

export function token({ refreshToken }) {
  return request("/auth/token", {
    method: "POST",
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).catch(() => Promise.reject("Ошибка входа"));
}

export function getUser({ accessToken }) {
  return request("/auth/user", {
    headers: {
      authorization: accessToken,
    },
  }).catch(() => Promise.reject("Ошибка получения пользователя"));
}

export function updateUser({ accessToken, ...user }) {
  return request("/auth/user", {
    method: "PATCH",
    headers: {
      authorization: accessToken,
    },
    body: JSON.stringify(user),
  });
}
