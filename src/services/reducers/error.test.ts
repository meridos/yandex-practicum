import { ERROR } from "../actions/error";
import { errorReducer } from "./error";

describe("create order reducer", () => {
  it("unknown action should return the initial state", () => {
    const result = errorReducer(undefined, { type: "" });

    expect(result).toEqual({
      overlayError: null,
    });
  });

  it("should handle ERROR", () => {
    const result = errorReducer(
      {
        overlayError: "some",
      },
      ERROR("test error")
    );

    expect(result).toEqual({
      overlayError: "test error",
    });
  });

  it("should handle ERROR with initial state", () => {
    const result = errorReducer(undefined, ERROR("test error"));

    expect(result).toEqual({
      overlayError: "test error",
    });
  });
});
