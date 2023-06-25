import { IIngredient } from "../../models";
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_SUCCESS,
} from "../actions/ingredients";
import { ingredientsReducer } from "./ingredients";

describe("ingredients reducer", () => {
  it("unknown action should return the initial state", () => {
    const result = ingredientsReducer(undefined, { type: "" });

    expect(result).toEqual({
      data: [],
      loading: false,
    });
  });

  it("should handle GET_INGREDIENTS", () => {
    const result = ingredientsReducer(
      {
        data: [{ _id: "1" } as IIngredient],
        loading: false,
      },
      GET_INGREDIENTS()
    );

    expect(result).toEqual({
      data: [{ _id: "1" } as IIngredient],
      loading: true,
    });
  });

  it("should handle GET_INGREDIENTS with initial state", () => {
    const result = ingredientsReducer(undefined, GET_INGREDIENTS());

    expect(result).toEqual({
      data: [],
      loading: true,
    });
  });

  it("should handle GET_INGREDIENTS_SUCCESS", () => {
    const result = ingredientsReducer(
      {
        data: [{ _id: "1" } as IIngredient],
        loading: true,
      },
      GET_INGREDIENTS_SUCCESS([{ _id: "2" } as IIngredient])
    );

    expect(result).toEqual({
      data: [{ _id: "2" } as IIngredient],
      loading: false,
    });
  });

  it("should handle GET_INGREDIENTS_SUCCESS with initial state", () => {
    const result = ingredientsReducer(
      undefined,
      GET_INGREDIENTS_SUCCESS([{ _id: "2" } as IIngredient])
    );

    expect(result).toEqual({
      data: [{ _id: "2" } as IIngredient],
      loading: false,
    });
  });

  it("should handle GET_INGREDIENTS_ERROR", () => {
    const result = ingredientsReducer(
      {
        data: [{ _id: "1" } as IIngredient],
        loading: true,
      },
      GET_INGREDIENTS_ERROR()
    );

    expect(result).toEqual({
      data: [],
      loading: false,
    });
  });
});
