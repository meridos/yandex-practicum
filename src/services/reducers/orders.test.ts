import { IOrder } from "../../models";
import {
  IOrdersGetDataAction,
  ORDERS_CONNECTION_CLOSED,
  ORDERS_CONNECTION_ERROR,
  ORDERS_CONNECTION_START,
  ORDERS_CONNECTION_SUCCESS,
  ORDERS_GET_DATA,
} from "../actions/orders";
import { ordersReducer } from "./orders";

jest.mock("../../utils/timestamp", () => ({
  ...jest.requireActual("../../utils/timestamp"),
  getCurrentTimestamp: () => 123,
}));

describe("orders reducer", () => {
  it("unknown action should return the initial state", () => {
    const result = ordersReducer(undefined, { type: "" });

    expect(result).toEqual({
      wsConnected: false,
      orders: null,
      total: 0,
      totalToday: 0,
      listeners: 0,
    });
  });

  it("should handle ORDERS_CONNECTION_START", () => {
    const result = ordersReducer(
      {
        wsConnected: true,
        orders: [],
        total: 1,
        totalToday: 2,
        listeners: 3,
      },
      { type: ORDERS_CONNECTION_START }
    );

    expect(result).toEqual({
      wsConnected: true,
      orders: [],
      total: 1,
      totalToday: 2,
      listeners: 4,
    });
  });

  it("should handle ORDERS_CONNECTION_START with initial state", () => {
    const result = ordersReducer(undefined, { type: ORDERS_CONNECTION_START });

    expect(result).toEqual({
      wsConnected: false,
      orders: null,
      total: 0,
      totalToday: 0,
      listeners: 1,
    });
  });

  it("should handle ORDERS_CONNECTION_SUCCESS", () => {
    const result = ordersReducer(
      {
        wsConnected: false,
        orders: [],
        total: 1,
        totalToday: 2,
        listeners: 3,
      },
      { type: ORDERS_CONNECTION_SUCCESS }
    );

    expect(result).toEqual({
      orders: [],
      total: 1,
      totalToday: 2,
      listeners: 3,
      error: undefined,
      wsConnected: true,
    });
  });

  it("should handle ORDERS_CONNECTION_SUCCESS with initial state", () => {
    const result = ordersReducer(undefined, {
      type: ORDERS_CONNECTION_SUCCESS,
    });

    expect(result).toEqual({
      orders: null,
      total: 0,
      totalToday: 0,
      listeners: 0,
      wsConnected: true,
    });
  });

  it("should handle ORDERS_CONNECTION_ERROR", () => {
    const result = ordersReducer(
      {
        wsConnected: true,
        orders: [],
        total: 1,
        totalToday: 2,
        listeners: 3,
      },
      { type: ORDERS_CONNECTION_ERROR, payload: "test error" }
    );

    expect(result).toEqual({
      orders: [],
      total: 1,
      totalToday: 2,
      listeners: 3,
      error: "test error",
      wsConnected: false,
    });
  });

  it("should handle ORDERS_CONNECTION_ERROR with initial state", () => {
    const result = ordersReducer(undefined, {
      type: ORDERS_CONNECTION_ERROR,
      payload: "test error",
    });

    expect(result).toEqual({
      wsConnected: false,
      orders: null,
      total: 0,
      totalToday: 0,
      listeners: 0,
      error: "test error",
    });
  });

  it("should handle ORDERS_CONNECTION_CLOSED when 1 listener", () => {
    const result = ordersReducer(
      {
        wsConnected: true,
        orders: [],
        total: 3,
        totalToday: 2,
        listeners: 1,
      },
      { type: ORDERS_CONNECTION_CLOSED }
    );

    expect(result).toEqual({
      orders: null,
      total: 0,
      totalToday: 0,
      listeners: 0,
      wsConnected: false,
    });
  });

  it("should handle ORDERS_CONNECTION_CLOSED when multiple listeners", () => {
    const result = ordersReducer(
      {
        wsConnected: true,
        orders: [],
        total: 3,
        totalToday: 2,
        listeners: 2,
      },
      { type: ORDERS_CONNECTION_CLOSED }
    );

    expect(result).toEqual({
      wsConnected: true,
      orders: [],
      total: 3,
      totalToday: 2,
      listeners: 1,
    });
  });

  it("should handle ORDERS_CONNECTION_CLOSED with initial state", () => {
    const result = ordersReducer(undefined, { type: ORDERS_CONNECTION_CLOSED });

    expect(result).toEqual({
      wsConnected: false,
      orders: null,
      total: 0,
      totalToday: 0,
      listeners: 0,
    });
  });

  it("should handle ORDERS_GET_DATA when success payload", () => {
    const result = ordersReducer(
      {
        wsConnected: true,
        orders: [{ _id: "1" } as IOrder],
        total: 0,
        totalToday: 1,
        listeners: 2,
      },
      {
        type: ORDERS_GET_DATA,
        payload: {
          orders: [{ _id: "1" } as IOrder],
          total: 2,
          success: true,
          totalToday: 1,
        },
      } as IOrdersGetDataAction
    );

    expect(result).toEqual({
      error: undefined,
      wsConnected: true,
      listeners: 2,
      orders: [{ _id: "1" } as IOrder],
      total: 2,
      totalToday: 1,
      timestamp: 123,
    });
  });

  it("should handle ORDERS_GET_DATA when error payload", () => {
    const result = ordersReducer(
      {
        wsConnected: true,
        orders: [{ _id: "1" } as IOrder],
        total: 0,
        totalToday: 1,
        listeners: 2,
      },
      {
        type: ORDERS_GET_DATA,
        payload: {
          message: "test error",
          success: false,
        },
      } as IOrdersGetDataAction
    );

    expect(result).toEqual({
      wsConnected: true,
      orders: [{ _id: "1" } as IOrder],
      total: 0,
      totalToday: 1,
      listeners: 2,
      error: "test error",
    });
  });

  it("should handle ORDERS_GET_DATA with initial state", () => {
    const result = ordersReducer(undefined, {
      type: ORDERS_GET_DATA,
      payload: {
        orders: [{ _id: "1" } as IOrder],
        total: 2,
        success: true,
        totalToday: 1,
      },
    } as IOrdersGetDataAction);

    expect(result).toEqual({
      wsConnected: false,
      listeners: 0,
      orders: [{ _id: "1" } as IOrder],
      total: 2,
      error: undefined,
      totalToday: 1,
      timestamp: 123,
    });
  });
});
