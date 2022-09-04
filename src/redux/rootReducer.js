import { createRouterReducer } from "@lagunovsky/redux-react-router";
import { combineReducers } from "redux";
import { browserHistory } from "../history.js";
import { dataReducer } from "./dataReducer";

export const rootReducer = combineReducers({
  clothingStoreData: dataReducer,
  router: createRouterReducer(browserHistory),
});
