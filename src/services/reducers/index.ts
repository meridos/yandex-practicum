import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { errorReducer } from "./error";
import { cartReducer } from "./cart";
import { orderReducer } from "./order";
import { profileReducer } from "./profile";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  cart: cartReducer,
  error: errorReducer,
  order: orderReducer,
  profile: profileReducer,
});

export default rootReducer;
