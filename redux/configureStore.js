import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import userReducer from "./reducers/userReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";
import uiReducer from "./reducers/uiReducer";
import recordReducer from "./reducers/recordReducer";
import resultReducer from "./reducers/resultReducer";
import premiseReducer from "./reducers/premiseReducer";

const initialState = {};
const middleware = [thunk];
const reducers = combineReducers({
  user: userReducer,
  UI: uiReducer,
  records: recordReducer,
  premise: premiseReducer,
  results: resultReducer,
});
const store = createStore(
  reducers,
  initialState,
  applyMiddleware(thunk, logger)
);

export default store;
