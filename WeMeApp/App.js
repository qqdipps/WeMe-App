import React, { Fragment, Component } from "react";
import { StyleSheet, StatusBar } from "react-native";
import MySocket from "./components/MySocket";
import SetupScreen from "./screens/SetupScreen";
import TestRealm from "./components/TestRealm";
import Realm from "realm";
import { booleanLiteral } from "@babel/types";

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
            displayName: "string"
          }
        },
        {
          name: "ConnectionEncryption",
          properties: {
            connectionId: "int",
            encryptionKey: "string"
          }
        },
        {
          name: "Message",
          properties: { self: "bool", contents: "string", dateTime: "string" }
        },
        {
          name: "ConnectionMessages",
          properties: {
            connectionId: "int",
            messages: "Message[]"
          }
        }
      ]
    };
    console.log(this.state.schema.UserSelfSchema);
  }

  setSocket = socket => {
    this.setState({ socket: socket });
  };

  render() {
    const { socket, schema } = this.state;
    return (
      <Fragment>
        {!socket && <MySocket setSocketCallback={this.setSocket} />}
        <StatusBar barStyle="dark-content" />
        {console.log("checking the schma", schema.UserSelfSchema)}
        <SetupScreen socket={socket} schema={schema} />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
