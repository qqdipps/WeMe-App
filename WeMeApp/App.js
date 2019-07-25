import React, { Fragment, Component } from "react";
import { StyleSheet, StatusBar } from "react-native";
import AppNavigator from "./screens/AppNavigator";
import { reConnectChannels } from "./functions/weMeConnections";
import TestAES from "./components/TestAES";

class App extends Component {
  constructor() {
    super();
    this.state = {
      userId: undefined,
      channels: [],
      socket: undefined,
      channelsSet: false,
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

  componentDidUpdate() {
    const { socket, schema } = this.state;
    if (!this.state.channelsSet) {
      reConnectChannels(socket, schema, this.initializeChannelsState);
      this.setState({ channelsSet: true });
    } else {
      console.log(this.state);
    }
  }

  setUserId = userId => {
    this.setState({ userId: userId });
  };

  addChannel = channel => {
    const channels = this.state.channels;
    channels.push(channel);
    this.setState({ channels: channels });
  };

  initializeChannelsState = channels => {
    this.setState({ channels: channels });
  };

  render() {
    const { schema, socket, channels, userID } = this.state;
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        {/* <TestRealm schema={schema} /> */}
        {/* <TestAES /> */}

        <AppNavigator
          screenProps={{
            schema,
            socket,
            channels,
            userID,
            setSocket: this.setSocket,
            initializeChannelsState: this.initializeChannelsState,
            addChannelState: this.addChannel,
            setUserId: this.setUserId
          }}
        />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
