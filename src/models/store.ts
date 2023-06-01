import { ThunkDispatch } from "redux-thunk";
import { ICreateOrderResponse } from "../api/create-order";
import { ICartIngredient } from "./cart-ingredient";
import { IIngredient } from "./ingredient";
import { TCartActions } from "../services/actions/cart";
import { TErrorActions } from "../services/actions/error";
import { TIngredientsActions } from "../services/actions/ingredients";
import { TOrderActions } from "../services/actions/order";
import { TProfileActions } from "../services/actions/profile";

export type TActions =
  | TCartActions
  | TErrorActions
  | TIngredientsActions
  | TOrderActions
  | TProfileActions;

export interface IState {
  error: IStateError;
  ingredients: IStateIngredients;
  order: IStateOrder;
  profile: IStateProfile;
  cart: IStateCart;
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

export interface IStateOrder {
  data: ICreateOrderResponse | null;
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

export type TDispatch = ThunkDispatch<IState, never, TActions>;
