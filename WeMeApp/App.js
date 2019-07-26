import React, { Fragment, Component } from "react";
import { StyleSheet, StatusBar } from "react-native";
import AppNavigator from "./screens/AppNavigator";
import { reConnectChannels } from "./functions/weMeConnections";
import { withInAppNotification } from "react-native-in-app-notification";

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
          primaryKey: "connectionId",
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
      reConnectChannels(
        this.notify,
        socket,
        schema,
        this.initializeChannelsState
      );
      this.setState({ channelsSet: true });
    }
  }

  setUserId = userId => {
    this.setState({ userId: userId });
    console.log("User id set:", userId);
  };

  addChannel = channel => {
    const channels = this.state.channels;
    channels.push(channel);
    this.setState({ channels: channels });
  };

  initializeChannelsState = channels => {
    this.setState({ channels: channels });
  };

  notify = displayName => {
    this.props.showNotification({
      title: "🚀 New Beam Received!",
      message: `Sent from ${displayName}.`,
      onPress: () => {}
    });
  };

  render() {
    const { schema, socket, channels, userId } = this.state;
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
            userId,
            setSocket: this.setSocket,
            initializeChannelsState: this.initializeChannelsState,
            addChannelState: this.addChannel,
            setUserId: this.setUserId,
            notify: this.notify
          }}
        />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({});

export default withInAppNotification(App);
