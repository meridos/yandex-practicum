import { IResponse, request } from "../utils/request";

export interface IPasswordResetBody {
  email: string;
}

export interface IPasswordResetResponse {
  message: string;
}

export function passwordReset({
  email,
}: IPasswordResetBody): Promise<IResponse<IPasswordResetResponse>> {
  return request<IPasswordResetResponse>("/password-reset", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export interface IConfirmResetBody {
  password: string;
  token: string;
}

export interface IConfirmResetResponse {
  message: string;
}

export function confirmReset({
  password,
  token,
}: IConfirmResetBody): Promise<IResponse<IConfirmResetResponse>> {
  return request<IConfirmResetResponse>("/password-reset/reset", {
    method: "POST",
    body: JSON.stringify({ password, token }),
  });
}
