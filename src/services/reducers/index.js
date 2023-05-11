import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { errorReducer } from "./error";
import { cartReducer } from "./cart";
import { detailsReducer } from "./details";
import { orderReducer } from "./order";
import { profileReducer } from "./profile";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  cart: cartReducer,
  error: errorReducer,
  details: detailsReducer,
  order: orderReducer,
  profile: profileReducer,
});

export default rootReducer;
