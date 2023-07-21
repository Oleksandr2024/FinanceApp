import { io } from "socket.io-client";

//For the reason to keep socket out of the socket middleware, because we need to have single socket instance
export default class SocketClient {
  socket;

  connect() {
    this.socket = io(process.env.REACT_APP_API_URL); // process.env.REACT_APP_API_URL
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(eventName, data) {
    if (this.socket) {
      this.socket.emit(eventName, data);
    }
  }

  on(eventName, func) {
    if (this.socket) {
      this.socket.on(eventName, func);
    }
  }
}
