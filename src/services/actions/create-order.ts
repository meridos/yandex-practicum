import { createAction } from "@reduxjs/toolkit";
import createOrderApi, { ICreateOrderResponse } from "../../api/create-order";
import { AppThunk } from "../../models";
import { RESET_CART } from "./cart";

export const CREATE_ORDER = createAction("order/create");
export const CREATE_ORDER_SUCCESS = createAction<ICreateOrderResponse>(
  "order/create/success"
);
export const CREATE_ORDER_ERROR = createAction<string>("order/create/error");
export const OPEN_ORDER = createAction("order/open");
export const CLOSE_ORDER = createAction("order/close");

export const createOrder =
  (orderListIds: string[]): AppThunk =>
  (dispatch) => {
    dispatch(CREATE_ORDER());
    dispatch(OPEN_ORDER());
    createOrderApi({ orderListIds })
      .then((data) => {
        dispatch(CREATE_ORDER_SUCCESS(data));
        dispatch(RESET_CART());
      })
      .catch((err) => {
        dispatch(CREATE_ORDER_ERROR(err));
      });
  };

export type TOrderActions = ReturnType<
  | typeof CREATE_ORDER
  | typeof CREATE_ORDER_SUCCESS
  | typeof CREATE_ORDER_ERROR
  | typeof OPEN_ORDER
  | typeof CLOSE_ORDER
>;
