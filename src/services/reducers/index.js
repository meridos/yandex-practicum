import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { errorReducer } from "./error";
import { cartReducer } from "./cart";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  cart: cartReducer,
  error: errorReducer,
});

export default rootReducer;
