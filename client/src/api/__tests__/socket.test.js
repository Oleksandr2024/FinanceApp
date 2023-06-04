import SocketClient from "../socket";

describe("SocketClient", () => {
  let socketClient;

  beforeEach(() => {
    socketClient = new SocketClient();
  });

  afterEach(() => {
    socketClient.disconnect();
  });

  test("connects to the server successfully", () => {
    socketClient.connect();

    expect(socketClient.socket).not.toBeNull();
  });

  test("disconnects from the server successfully", () => {
    socketClient.connect();
    socketClient.disconnect();

    expect(socketClient.socket).toBeNull();
  });

  test("emits an event to the server", () => {
    socketClient.connect();

    const eventName = "testEvent";
    const eventData = { message: "Hello, server!" };

    const emitSpy = jest.spyOn(socketClient.socket, "emit");

    socketClient.emit(eventName, eventData);

    expect(emitSpy).toHaveBeenCalledWith(eventName, eventData);
  });

  test("registers an event listener", () => {
    socketClient.connect();

    const eventName = "testEvent";
    const eventHandler = jest.fn();

    const onSpy = jest.spyOn(socketClient.socket, "on");

    socketClient.on(eventName, eventHandler);

    expect(onSpy).toHaveBeenCalledWith(eventName, eventHandler);
  });
});
