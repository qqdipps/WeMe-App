import { Socket } from "phoenix";

export function weMeSocket(setSocketCallback) {
  const mySocket = new Socket("ws://172.24.27.81:4000/socket");
  setSocketCallback(mySocket);
  mySocket.connect();

  mySocket.onOpen(() => {
    console.log("Socket connection to websocket on WeMeAPI");
  });

  mySocket.onClose(e => {
    // connection closed
    console.log(e.code, e.reason);
  });

  mySocket.onError(e => {
    // an error occurred
    console.log("error");
    console.log(e.message);
  });
  return null;
}
