import { createAction } from "@reduxjs/toolkit";
import getIngredientsApi from "../../api/get-ingredients";
import { ERROR } from "./error";

export const GET_INGREDIENTS = createAction("ingredients/request");
export const GET_INGREDIENTS_SUCCESS = createAction(
  "ingredients/request/success"
);

export const getIngredients = () => (dispatch) => {
  dispatch(GET_INGREDIENTS());
  getIngredientsApi()
    .then((items) => {
      dispatch(GET_INGREDIENTS_SUCCESS(items));
    })
    .catch((err) => {
      dispatch(ERROR(err));
    });
};
