import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";
import { combineReducers } from "redux";

const enhancer =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const rootReducer = combineReducers({
  users: reducer,
});

export const store = configureStore({ users: rootReducer }, enhancer);
