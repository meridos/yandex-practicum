import { createReducer } from "@reduxjs/toolkit";
import { IStateOrders } from "../../models";
import { getCurrentTimestamp } from "../../utils/timestamp";
import {
  IOrdersConnectionErrorAction,
  IOrdersGetDataAction,
  ORDERS_CONNECTION_CLOSED,
  ORDERS_CONNECTION_ERROR,
  ORDERS_CONNECTION_START,
  ORDERS_CONNECTION_SUCCESS,
  ORDERS_GET_DATA,
} from "../actions/orders";

const initialState: IStateOrders = {
  wsConnected: false,
  orders: null,
  total: 0,
  totalToday: 0,
  listeners: 0,
};

export const ordersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ORDERS_CONNECTION_START, (state) => ({
      ...state,
      listeners: state.listeners + 1,
    }))
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
    .addCase(ORDERS_CONNECTION_CLOSED, (state) => {
      const listeners = Math.max(state.listeners - 1, 0);

      if (listeners === 0) {
        return initialState;
      }

      return {
        ...state,
        listeners,
      };
    })
    .addCase(ORDERS_GET_DATA, (state, action: IOrdersGetDataAction) => {
      return action.payload.success
        ? {
            ...state,
            error: undefined,
            orders: action.payload.orders,
            timestamp: getCurrentTimestamp(),
            total: action.payload.total,
            totalToday: action.payload.totalToday,
          }
        : {
            ...state,
            error: action.payload.message,
          };
    });
});
