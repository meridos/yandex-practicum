import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { errorReducer } from "./error";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  error: errorReducer,
});

export default rootReducer;
