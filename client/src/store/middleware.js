//This file defines the middleware that listens for actions and emits events through Socket.io.
import { receiveData } from "./dataSlice";

export const socketMiddleware = (socket) => (store) => (next) => (action) => {
  switch (action.type) {
    //connect to the socket when user starts trackling tickers
    case "data/connectSocket": {
      socket.connect();

      // Receive first set of data and dispatch it to store
      socket.on("data", (data) => {
        store.dispatch(receiveData(data));
      });
      break;
    }

    case "toolSlice/setInterval": {
      const interval = action.payload;
      socket.emit("setInterval", interval);
      break;
    }

    case "data/disconnectServer": {
      socket.disconnect();

      break;
    }

    default:
  }

  const result = next(action);
  return result;
};
