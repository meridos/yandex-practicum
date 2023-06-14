import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { ICreateOrderResponse as ICreatedOrderResponse } from "../api/create-order";
import { ICartIngredient } from "./cart-ingredient";
import { IIngredient } from "./ingredient";
import { TCartActions } from "../services/actions/cart";
import { TErrorActions } from "../services/actions/error";
import { TIngredientsActions } from "../services/actions/ingredients";
import { TOrderActions } from "../services/actions/create-order";
import { TProfileActions } from "../services/actions/profile";
import { TWSActions } from "../services/actions/orders";
import { IOrder } from "./order";

export type TActions =
  | TCartActions
  | TErrorActions
  | TIngredientsActions
  | TOrderActions
  | TProfileActions
  | TWSActions;

export interface IState {
  error: IStateError;
  ingredients: IStateIngredients;
  createOrder: IStateCreateOrder;
  profile: IStateProfile;
  cart: IStateCart;
  orders: IStateOrders;
}

export interface IStateError {
  overlayError: string | null;
}

export interface IStateIngredients {
  data: IIngredient[];
  loading: boolean;
}

export interface IStateCart {
  bun: string | null;
  ingredients: ICartIngredient[];
}

export interface IStateCreateOrder {
  data: ICreatedOrderResponse | null;
  loading: boolean;
  error: string | boolean;
  open: boolean;
}

export interface IStateProfile {
  email: string;
  name: string;
  request: {
    error: null | string;
    loading: boolean;
    fetched: boolean;
  };
}

export interface IStateOrders {
  wsConnected: boolean;
  orders: ReadonlyArray<IOrder> | null;
  total: number;
  totalToday: number;
  timestamp?: number;
  error?: string;
  listeners: number;
}

export type TDispatch = ThunkDispatch<IState, never, TActions>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  IState,
  never,
  TActions
>;
