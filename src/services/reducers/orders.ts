import { createReducer } from "@reduxjs/toolkit";
import { IStateOrders } from "../../models";
import { getCurrentTimestamp } from "../../utils/timestamp";
import {
  IOrdersConnectionErrorAction,
  IOrdersGetDataAction,
  ORDERS_CONNECTION_CLOSED,
  ORDERS_CONNECTION_ERROR,
  ORDERS_CONNECTION_SUCCESS,
  ORDERS_GET_DATA,
} from "../actions/orders";

const initialState: IStateOrders = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const ordersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ORDERS_CONNECTION_SUCCESS, (state) => ({
      ...state,
      error: undefined,
      wsConnected: true,
    }))
    .addCase(
      ORDERS_CONNECTION_ERROR,
      (state, action: IOrdersConnectionErrorAction) => ({
        ...state,
        error: action.payload,
        wsConnected: false,
      })
    )
    .addCase(ORDERS_CONNECTION_CLOSED, (state) => ({
      ...state,
      error: undefined,
      wsConnected: false,
    }))
    .addCase(ORDERS_GET_DATA, (state, action: IOrdersGetDataAction) => {
      return {
        ...state,
        error: undefined,
        orders: action.payload.orders,
        timestamp: getCurrentTimestamp(),
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    });
});
