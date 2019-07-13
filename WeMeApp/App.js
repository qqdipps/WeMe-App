import React, { Fragment, Component } from "react";
import { StyleSheet, StatusBar } from "react-native";
import MySocket from "./components/MySocket";
import SetupScreen from "./screens/SetupScreen";
import TestRealm from "./components/TestRealm";
import Realm from "realm";

class App extends Component {
  constructor() {
    super();
    this.state = { socket: undefined };
  }

  setSocket = socket => {
    this.setState({ socket: socket });
  };

  render() {
    const { socket } = this.state;
    return (
      <Fragment>
        {!socket && <MySocket setSocketCallback={this.setSocket} />}
        <StatusBar barStyle="dark-content" />
        <TestRealm />
        <SetupScreen />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
