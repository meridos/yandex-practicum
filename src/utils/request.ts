import { ACCESS_TOKEN_COOKIE } from "../services/actions/profile";
import { getCookie } from "./cookie";

const BASE_URL_API = "https://norma.nomoreparties.space/api";

interface IFetch<T> {
  json(): Promise<T>;
}

export type IRequestOptions = {
  headers?: Record<string, string>;
} & (IRequestOptionsGet | IRequestOptionsUpdate);

type IRequestOptionsGet = {
  method?: "GET" | "DELETE" | "OPTIONS";
};

type IRequestOptionsUpdate = {
  method: "POST" | "PUT" | "PATCH";
  body?: string;
};

export type IResponse<T = {}> = {
  success: boolean;
} & T;

export function request<O>(
  urlApi: string,
  options: IRequestOptions = {}
): Promise<IResponse<O>> {
  urlApi = urlApi[0] === "/" ? urlApi.substring(1) : urlApi;

  return fetch(`${BASE_URL_API}/${urlApi}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  }).then((res) => checkResponse<O>(res));
}

export function requestWithAuth<O>(
  urlApi: string,
  options: IRequestOptions = {}
): Promise<IResponse<O>> {
  return request<O>(urlApi, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: getCookie(ACCESS_TOKEN_COOKIE) || "",
    },
  });
}

function checkResponse<D>(res: IFetch<IResponse<D>>): Promise<IResponse<D>> {
  try {
    return res
      .json()
      .then((data: IResponse<D>) =>
        data.success ? data : Promise.reject(data)
      );
  } catch (e) {
    return Promise.reject();
  }
}
