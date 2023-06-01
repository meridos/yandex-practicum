import { createAction } from "@reduxjs/toolkit";

export const APPEND_BUN_CART = createAction<string>("cart/append/bun");
export const APPEND_INGREDIENT_CART = createAction<{
  id: string;
  uuid: string;
}>("cart/append/ingredient");
export const REMOVE_CART = createAction<string>("cart/remove");
export const SORT_CART = createAction<{ prevUuid: string; newUuid: string }>(
  "cart/sort"
);
export const RESET_CART = createAction("cart/reset");

export type TCartActions = ReturnType<
  | typeof APPEND_BUN_CART
  | typeof APPEND_INGREDIENT_CART
  | typeof REMOVE_CART
  | typeof SORT_CART
  | typeof RESET_CART
>;
