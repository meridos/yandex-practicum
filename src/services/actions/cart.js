import { createAction } from "@reduxjs/toolkit";

export const APPEND_BUN_CART = createAction("cart/append/bun");
export const APPEND_INGREDIENT_CART = createAction("cart/append/ingredient");
export const REMOVE_CART = createAction("cart/remove");
export const SORT_CART = createAction("cart/sort");
export const RESET_CART = createAction("cart/reset");
