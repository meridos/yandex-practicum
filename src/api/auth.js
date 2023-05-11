import request from "../utils/request";

export function login({ email, password }) {
  return request("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .catch(() => Promise.reject("Ошибка входа"))
    .then(({ success, ...data }) => data);
}

export function register({ email, password, name }) {
  return request("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).catch(() => Promise.reject("Ошибка выхода"));
}

export function token() {
  return request("/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .catch(() => Promise.reject("Ошибка входа"))
    .then((res) => res.order ?? Promise.reject("Ошибка входа"));
}
