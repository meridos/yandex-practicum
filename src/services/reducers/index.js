import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { errorReducer } from "./error";
import { cartReducer } from "./cart";
import { detailsReducer } from "./details";
import { orderReducer } from "./order";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  cart: cartReducer,
  error: errorReducer,
  details: detailsReducer,
  order: orderReducer,
});

export default rootReducer;
