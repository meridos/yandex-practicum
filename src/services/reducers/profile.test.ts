import {
  CLEAR_PROFILE,
  ERROR_PROFILE,
  REQUEST_PROFILE,
  SUCCESS_PROFILE,
} from "../actions/profile";
import { profileReducer } from "./profile";

jest.mock("../../utils/timestamp", () => ({
  ...jest.requireActual("../../utils/timestamp"),
  getCurrentTimestamp: () => 123,
}));

describe("profile reducer", () => {
  it("unknown action should return the initial state", () => {
    const result = profileReducer(undefined, { type: "" });

    expect(result).toEqual({
      email: "",
      name: "",
      request: {
        error: null,
        loading: false,
        fetched: false,
      },
    });
  });

  it("should handle REQUEST_PROFILE", () => {
    const result = profileReducer(
      {
        email: "test email",
        name: "test name",
        request: {
          error: "test error",
          loading: false,
          fetched: true,
        },
      },
      REQUEST_PROFILE()
    );

    expect(result).toEqual({
      email: "test email",
      name: "test name",
      request: {
        error: null,
        loading: true,
        fetched: true,
      },
    });
  });

  it("should handle REQUEST_PROFILE with initial state", () => {
    const result = profileReducer(undefined, REQUEST_PROFILE());

    expect(result).toEqual({
      email: "",
      name: "",
      request: {
        error: null,
        loading: true,
        fetched: false,
      },
    });
  });

  it("should handle SUCCESS_PROFILE", () => {
    const result = profileReducer(
      {
        email: "test email",
        name: "test name",
        request: {
          error: "test error",
          loading: false,
          fetched: true,
        },
      },
      SUCCESS_PROFILE({ email: "test email 2", name: "test name 2" })
    );

    expect(result).toEqual({
      email: "test email 2",
      name: "test name 2",
      request: {
        error: null,
        loading: false,
        fetched: true,
      },
    });
  });

  it("should handle SUCCESS_PROFILE with initial state", () => {
    const result = profileReducer(
      undefined,
      SUCCESS_PROFILE({
        email: "test email 2",
        name: "test name 2",
      })
    );

    expect(result).toEqual({
      email: "test email 2",
      name: "test name 2",
      request: {
        error: null,
        loading: false,
        fetched: true,
      },
    });
  });

  it("should handle ERROR_PROFILE", () => {
    const result = profileReducer(
      {
        email: "test email",
        name: "test name",
        request: {
          error: "test error",
          loading: true,
          fetched: false,
        },
      },
      ERROR_PROFILE("test error 2")
    );

    expect(result).toEqual({
      email: "test email",
      name: "test name",
      request: {
        error: "test error 2",
        loading: false,
        fetched: true,
      },
    });
  });

  it("should handle ERROR_PROFILE with initial state", () => {
    const result = profileReducer(undefined, ERROR_PROFILE("test error 2"));

    expect(result).toEqual({
      email: "",
      name: "",
      request: {
        error: "test error 2",
        loading: false,
        fetched: true,
      },
    });
  });

  it("should handle CLEAR_PROFILE", () => {
    const result = profileReducer(
      {
        email: "test email",
        name: "test name",
        request: {
          error: "test error",
          loading: true,
          fetched: false,
        },
      },
      CLEAR_PROFILE()
    );

    expect(result).toEqual({
      email: "",
      name: "",
      request: {
        error: null,
        loading: false,
        fetched: false,
      },
    });
  });

  it("should handle CLEAR_PROFILE with initial state", () => {
    const result = profileReducer(undefined, CLEAR_PROFILE());

    expect(result).toEqual({
      email: "",
      name: "",
      request: {
        error: null,
        loading: false,
        fetched: false,
      },
    });
  });
});
