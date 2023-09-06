import { combineReducers } from "redux";
import userReducer from "./userReducer";
import cinemaReducer from "./cinemaReducer";

const rootReducer = combineReducers({
  user: userReducer,
  cinema: cinemaReducer,
});

export default rootReducer;
