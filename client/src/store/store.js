import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import { socketMiddleware } from "./middleware";
import SocketClient from "../api/socket";

const socket = new SocketClient();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(socketMiddleware(socket));
  },
});

export default store;
