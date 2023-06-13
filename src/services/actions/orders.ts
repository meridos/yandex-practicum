import { Dispatch } from "react";
import { IGetOrdersResponse, IState, TDispatch } from "../../models";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { getIngredients } from "./ingredients";
import { getCookie } from "../../utils/cookie";
import { ACCESS_TOKEN_COOKIE } from "./profile";

export const ORDERS_CONNECTION_START: "ORDERS_CONNECTION_START" =
  "ORDERS_CONNECTION_START";
export const ORDERS_CONNECTION_SUCCESS: "ORDERS_CONNECTION_SUCCESS" =
  "ORDERS_CONNECTION_SUCCESS";
export const ORDERS_CONNECTION_ERROR: "ORDERS_CONNECTION_ERROR" =
  "ORDERS_CONNECTION_ERROR";
export const ORDERS_CONNECTION_CLOSED: "ORDERS_CONNECTION_CLOSED" =
  "ORDERS_CONNECTION_CLOSED";
export const ORDERS_GET_DATA: "ORDERS_GET_DATA" = "ORDERS_GET_DATA";

export interface IOrdersConnectionStart {
  readonly type: typeof ORDERS_CONNECTION_START;
  readonly payload: string;
}

export interface IOrdersConnectionSuccessAction {
  readonly type: typeof ORDERS_CONNECTION_SUCCESS;
}

export interface IOrdersConnectionErrorAction {
  readonly type: typeof ORDERS_CONNECTION_ERROR;
  readonly payload: string;
}

export interface IOrdersConnectionClosedAction {
  readonly type: typeof ORDERS_CONNECTION_CLOSED;
}

export interface IOrdersGetDataAction {
  readonly type: typeof ORDERS_GET_DATA;
  readonly payload: IGetOrdersResponse;
}

export type TWSActions =
  | IOrdersConnectionStart
  | IOrdersConnectionSuccessAction
  | IOrdersConnectionErrorAction
  | IOrdersConnectionClosedAction
  | IOrdersGetDataAction;

export type TWSStoreActions = {
  wsInit: typeof ORDERS_CONNECTION_START;
  onOpen: typeof ORDERS_CONNECTION_SUCCESS;
  onClose: typeof ORDERS_CONNECTION_CLOSED;
  onError: typeof ORDERS_CONNECTION_ERROR;
  onOrders: typeof ORDERS_GET_DATA;
};

export const getProfileOrders =
  (): ThunkAction<void, IState, unknown, Action<unknown>> =>
  (dispatch, getState) => {
    const { ingredients } = getState();
    const token = getCookie(ACCESS_TOKEN_COOKIE)?.replace("Bearer ", "");

    if (ingredients.data.length === 0 && !ingredients.loading) {
      dispatch(getIngredients());
    }

    dispatch({
      type: ORDERS_CONNECTION_START,
      payload: `orders?token=${token}`,
    });
  };

export const getAllOrders =
  (): ThunkAction<void, IState, unknown, Action<unknown>> =>
  (dispatch, getState) => {
    const { ingredients } = getState();

    if (ingredients.data.length === 0 && !ingredients.loading) {
      dispatch(getIngredients());
    }

    dispatch({ type: ORDERS_CONNECTION_START, payload: "orders/all" });
  };
