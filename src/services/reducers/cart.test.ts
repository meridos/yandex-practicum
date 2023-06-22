import {
  APPEND_BUN_CART,
  APPEND_INGREDIENT_CART,
  REMOVE_CART,
  RESET_CART,
  SORT_CART,
} from "../actions/cart";
import { cartReducer } from "./cart";

describe("cart reducer", () => {
  it("unknown action should return the initial state", () => {
    const result = cartReducer(undefined, { type: "" });

    expect(result).toEqual({
      bun: null,
      ingredients: [],
    });
  });

  it("should handle APPEND_BUN_CART", () => {
    const result = cartReducer(
      {
        bun: "old bun",
        ingredients: [],
      },
      APPEND_BUN_CART("test bun")
    );

    expect(result).toEqual({
      bun: "test bun",
      ingredients: [],
    });
  });

  it("should handle APPEND_BUN_CART with initial state", () => {
    const result = cartReducer(undefined, APPEND_BUN_CART("test bun"));

    expect(result).toEqual({
      bun: "test bun",
      ingredients: [],
    });
  });

  it("should handle APPEND_INGREDIENT_CART", () => {
    const result = cartReducer(
      {
        bun: "test bun",
        ingredients: [{ id: "1", uuid: "2" }],
      },
      APPEND_INGREDIENT_CART({ id: "3", uuid: "4" })
    );

    expect(result).toEqual({
      bun: "test bun",
      ingredients: [
        { id: "1", uuid: "2" },
        { id: "3", uuid: "4" },
      ],
    });
  });

  it("should handle APPEND_INGREDIENT_CART with initial state", () => {
    const result = cartReducer(
      undefined,
      APPEND_INGREDIENT_CART({ id: "3", uuid: "4" })
    );

    expect(result).toEqual({
      bun: null,
      ingredients: [{ id: "3", uuid: "4" }],
    });
  });

  it("should handle REMOVE_CART", () => {
    const result = cartReducer(
      {
        bun: "test bun",
        ingredients: [
          { id: "1", uuid: "2" },
          { id: "3", uuid: "4" },
          { id: "5", uuid: "6" },
        ],
      },
      REMOVE_CART("4")
    );

    expect(result).toEqual({
      bun: "test bun",
      ingredients: [
        { id: "1", uuid: "2" },
        { id: "5", uuid: "6" },
      ],
    });
  });

  it("should handle REMOVE_CART with initial state", () => {
    const result = cartReducer(undefined, REMOVE_CART("4"));

    expect(result).toEqual({
      bun: null,
      ingredients: [],
    });
  });

  it("should handle SORT_CART", () => {
    const result = cartReducer(
      {
        bun: "test bun",
        ingredients: [
          { id: "1", uuid: "2" },
          { id: "3", uuid: "4" },
          { id: "5", uuid: "6" },
          { id: "7", uuid: "8" },
        ],
      },
      SORT_CART({ newUuid: "8", prevUuid: "4" })
    );

    expect(result).toEqual({
      bun: "test bun",
      ingredients: [
        { id: "1", uuid: "2" },
        { id: "7", uuid: "8" },
        { id: "5", uuid: "6" },
        { id: "3", uuid: "4" },
      ],
    });
  });

  it("should handle SORT_CART with not found uuid", () => {
    const result = cartReducer(
      {
        bun: "test bun",
        ingredients: [
          { id: "1", uuid: "2" },
          { id: "3", uuid: "4" },
          { id: "5", uuid: "6" },
          { id: "7", uuid: "8" },
        ],
      },
      SORT_CART({ newUuid: "999", prevUuid: "4" })
    );

    expect(result).toEqual({
      bun: "test bun",
      ingredients: [
        { id: "1", uuid: "2" },
        { id: "3", uuid: "4" },
        { id: "5", uuid: "6" },
        { id: "7", uuid: "8" },
      ],
    });
  });

  it("should handle RESET_CART", () => {
    const result = cartReducer(
      {
        bun: "test bun",
        ingredients: [
          { id: "1", uuid: "2" },
          { id: "3", uuid: "4" },
          { id: "5", uuid: "6" },
          { id: "7", uuid: "8" },
        ],
      },
      RESET_CART()
    );

    expect(result).toEqual({
      bun: null,
      ingredients: [],
    });
  });
});
