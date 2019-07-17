import { Socket } from "phoenix";

export function weMeSocket(setSocketCallback) {
  const mySocket = new Socket("ws://192.168.10.113:4000/socket");
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
