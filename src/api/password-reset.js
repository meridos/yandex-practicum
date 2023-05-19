import request from "../utils/request";

export function passwordReset(email) {
  return request("/password-reset", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function confirmReset(password, token) {
  return request("/password-reset/reset", {
    method: "POST",
    body: JSON.stringify({ password, token }),
  });
}
