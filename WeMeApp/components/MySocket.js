import React, { Component } from "react";
import { Text } from "react-native";
import { Socket } from "phoenix";

class MySocket extends Component {
  constructor() {
    super();
    this.state = { socket: undefined };
  }
  componentDidMount = () => {
    if (!this.state.socket) {
      this.initializeSocket();
    }
  };

  initializeSocket = () => {
    const mySocket = new Socket("ws://192.168.1.12:4000/socket");

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

    this.setState({ socket: mySocket });
  };

  render() {
    return <Text>App Connected? </Text>;
  }
}
export default MySocket;
