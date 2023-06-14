import type { Middleware, MiddlewareAPI } from "redux";

import { IGetOrdersResponse, IState, TActions, TDispatch } from "../../models";
import { TWSStoreActions } from "../actions/orders";

export const webSocketMiddleware = (
  wsBaseUrl: string,
  wsActions: TWSStoreActions
): Middleware => {
  return ((store: MiddlewareAPI<TDispatch, IState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TActions) => {
      const { dispatch, getState } = store;
      const state = getState();

      const { wsInit, onOpen, onClose, onError, onOrders } = wsActions;

      if (action.type === wsInit && !socket) {
        socket = new WebSocket(`${wsBaseUrl}${action.payload}`);
      }

      if (
        action.type === onClose &&
        socket?.readyState !== socket?.CLOSED &&
        state.orders.listeners <= 1
      ) {
        socket?.close(1000, "MANUAL_CLOSE");
        socket = null;
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: "Ошибка загрузки заказов" });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData: IGetOrdersResponse = JSON.parse(data);
          const restParsedData = parsedData;

          dispatch({
            type: onOrders,
            payload: restParsedData,
          });
        };

        socket.onclose = (event) => {
          if (event.reason !== "MANUAL_CLOSE") {
            dispatch({ type: onClose });
          }
          socket = null;
        };
      }

      next(action);
    };
  }) as Middleware;
};
