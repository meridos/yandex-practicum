import { createAction } from "@reduxjs/toolkit";
import createOrderApi from "../../api/create-order";
import { RESET_CART } from "./cart";

export const CREATE_ORDER = createAction("order/create");
export const CREATE_ORDER_SUCCESS = createAction("order/create/success");
export const CREATE_ORDER_ERROR = createAction("order/create/error");
export const OPEN_ORDER = createAction("order/open");
export const CLOSE_ORDER = createAction("order/close");

export const createOrder = (orderListIds) => (dispatch) => {
  dispatch(CREATE_ORDER(orderListIds));
  createOrderApi(orderListIds)
    .then((data) => {
      dispatch(CREATE_ORDER_SUCCESS(data));
      dispatch(OPEN_ORDER());
      dispatch(RESET_CART());
    })
    .catch((err) => {
      dispatch(CREATE_ORDER_ERROR(err));
    });
};
