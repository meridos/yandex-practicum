import type { Middleware, MiddlewareAPI } from "redux";

import { IGetOrdersResponse, IState, TActions, TDispatch } from "../../models";
import { getCurrentTimestamp } from "../../utils/timestamp";
import { TWSStoreActions } from "../actions/orders";
import { ACCESS_TOKEN_COOKIE, getUser } from "../actions/profile";
import { getCookie } from "../../utils/cookie";

export const webSocketMiddleware = (
  wsBaseUrl: string,
  wsActions: TWSStoreActions
): Middleware => {
  return ((store: MiddlewareAPI<TDispatch, IState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TActions) => {
      const { dispatch, getState } = store;
      const token = getCookie(ACCESS_TOKEN_COOKIE);
      const { wsInit, onOpen, onClose, onError, onOrders } = wsActions;

      if (action.type === wsInit && token) {
        socket = new WebSocket(`${wsBaseUrl}${action.payload}?token=${token}`);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
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
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  }) as Middleware;
};
