import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { errorReducer } from "./error";
import { cartReducer } from "./cart";
import { createOrderReducer } from "./create-order";
import { profileReducer } from "./profile";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  cart: cartReducer,
  error: errorReducer,
  createOrder: createOrderReducer,
  profile: profileReducer,
});

export default rootReducer;
