import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { webSocketMiddleware } from "./middlewares";
import {
  TWSStoreActions,
  ORDERS_CONNECTION_CLOSED,
  ORDERS_CONNECTION_ERROR,
  ORDERS_CONNECTION_START,
  ORDERS_CONNECTION_SUCCESS,
  ORDERS_GET_DATA,
} from "./actions/orders";

const wsBaseUrl: string = "wss://norma.nomoreparties.space/";
const wsActions: TWSStoreActions = {
  wsInit: ORDERS_CONNECTION_START,
  onOpen: ORDERS_CONNECTION_SUCCESS,
  onClose: ORDERS_CONNECTION_CLOSED,
  onError: ORDERS_CONNECTION_ERROR,
  onOrders: ORDERS_GET_DATA,
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(webSocketMiddleware(wsBaseUrl, wsActions)),
});

export default store;
