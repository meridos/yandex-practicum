import {
  CLOSE_ORDER,
  CREATE_ORDER,
  CREATE_ORDER_ERROR,
  CREATE_ORDER_SUCCESS,
  OPEN_ORDER,
} from "../actions/create-order";
import { createOrderReducer } from "./create-order";

describe("create order reducer", () => {
  it("unknown action should return the initial state", () => {
    const result = createOrderReducer(undefined, { type: "" });

    expect(result).toEqual({
      data: null,
      loading: false,
      error: false,
      open: false,
    });
  });

  it("should handle CREATE_ORDER", () => {
    const result = createOrderReducer(
      {
        data: null,
        loading: false,
        error: true,
        open: false,
      },
      CREATE_ORDER()
    );

    expect(result).toEqual({
      data: null,
      loading: true,
      error: false,
      open: false,
    });
  });

  it("should handle CREATE_ORDER with initial state", () => {
    const result = createOrderReducer(undefined, CREATE_ORDER());

    expect(result).toEqual({
      data: null,
      loading: true,
      error: false,
      open: false,
    });
  });

  it("should handle CREATE_ORDER_SUCCESS", () => {
    const result = createOrderReducer(
      {
        data: null,
        loading: false,
        error: "some",
        open: false,
      },
      CREATE_ORDER_SUCCESS({ number: 1 })
    );

    expect(result).toEqual({
      data: { number: 1 },
      loading: false,
      error: "some",
      open: false,
    });
  });

  it("should handle CREATE_ORDER_SUCCESS with initial state", () => {
    const result = createOrderReducer(
      undefined,
      CREATE_ORDER_SUCCESS({ number: 1 })
    );

    expect(result).toEqual({
      data: { number: 1 },
      loading: false,
      error: false,
      open: false,
    });
  });

  it("should handle CREATE_ORDER_ERROR", () => {
    const result = createOrderReducer(
      {
        data: null,
        loading: false,
        error: "some",
        open: false,
      },
      CREATE_ORDER_ERROR("test error")
    );

    expect(result).toEqual({
      data: null,
      loading: false,
      error: "test error",
      open: false,
    });
  });

  it("should handle CREATE_ORDER_ERROR with initial state", () => {
    const result = createOrderReducer(
      undefined,
      CREATE_ORDER_ERROR("test error")
    );

    expect(result).toEqual({
      data: null,
      loading: false,
      error: "test error",
      open: false,
    });
  });

  it("should handle OPEN_ORDER", () => {
    const result = createOrderReducer(
      {
        data: null,
        loading: false,
        error: "some",
        open: false,
      },
      OPEN_ORDER()
    );

    expect(result).toEqual({
      data: null,
      loading: false,
      error: "some",
      open: true,
    });
  });

  it("should handle OPEN_ORDER with initial state", () => {
    const result = createOrderReducer(undefined, OPEN_ORDER());

    expect(result).toEqual({
      data: null,
      loading: false,
      error: false,
      open: true,
    });
  });

  it("should handle CLOSE_ORDER", () => {
    const result = createOrderReducer(
      {
        data: null,
        loading: false,
        error: "some",
        open: true,
      },
      CLOSE_ORDER()
    );

    expect(result).toEqual({
      data: null,
      loading: false,
      error: "some",
      open: false,
    });
  });

  it("should handle CLOSE_ORDER with initial state", () => {
    const result = createOrderReducer(undefined, CLOSE_ORDER());

    expect(result).toEqual({
      data: null,
      loading: false,
      error: false,
      open: false,
    });
  });
});
