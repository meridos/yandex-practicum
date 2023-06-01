import { createAction } from "@reduxjs/toolkit";

export const ERROR = createAction<string | null>("error");

export type TErrorActions = ReturnType<typeof ERROR>;
