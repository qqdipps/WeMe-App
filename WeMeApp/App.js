import React, { Fragment, Component } from "react";
import { StyleSheet, StatusBar } from "react-native";
import AppNavigator from "./screens/AppNavigator";

class App extends Component {
  constructor() {
    super();
    this.state = {
      socket: undefined,
      schema: [
        {
          name: "UserSelf",
          properties: {
            userId: "int",
            displayName: "string",
            channels: "int?[]"
          }
        },
        {
          name: "ConnectAES",
          primaryKey: "connectionId",
          properties: {
            connectionId: "int",
            encryptionKey: "string",
            inUse: "bool"
          }
        },
        {
          name: "Message",
          properties: { self: "bool", contents: "string", dateTime: "string" }
        },
        {
          name: "Sender",
          properties: {
            displayName: "string",
            notes: "string?"
          }
        },
        {
          name: "ConnectionMessages",
          properties: {
            connectionId: "int",
            messages: "Message[]",
            sender: "Sender"
          }
        }
      ]
    };
  }

  setSocket = socket => {
    this.setState({ socket: socket });
  };

  render() {
    const { schema, socket } = this.state;
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        {/* <TestRealm schema={schema} /> */}
        {/* <TestAES /> */}

        <AppNavigator
          screenProps={{ schema, socket, setSocket: this.setSocket }}
        />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
