// This file exports the root reducer for app, which combines all the individual reducers into a single state tree.
import { combineReducers } from "@reduxjs/toolkit";
import { dataSlice } from "./dataSlice";
import { toolSlice } from "./toolSlice";

const rootReducer = combineReducers({
  data: dataSlice.reducer,
  toolSlice: toolSlice.reducer,
});

export default rootReducer;
