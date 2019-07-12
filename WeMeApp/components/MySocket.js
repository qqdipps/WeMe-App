import React, { Component } from "react";
import { Text } from "react-native";
import { Socket } from "phoenix";

class MySocket extends Component {
  constructor() {
    super();
    this.state = { socket: undefined };
  }

  initializeSocket = () => {
    const mySocket = new Socket();
  };

  render() {
    return <Text>App Connected? </Text>;
  }
}
export default MySocket;
