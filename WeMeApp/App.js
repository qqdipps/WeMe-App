import React, { Fragment, Component } from "react";
import { StyleSheet, StatusBar } from "react-native";
import AppNavigator from "./screens/AppNavigator";
import { reConnectChannels } from "./functions/weMeConnections";
import { withInAppNotification } from "react-native-in-app-notification";
import OfflineNotice from "./components/OfflineNotice";

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
            notes: "string?[]",
            connected: { type: "bool", default: true }
          }
        },
        {
          name: "ConnectionMessages",
          primaryKey: "connectionId",
          properties: {
            connectionId: "int",
            messages: "Message[]",
            sender: "Sender",
            unreadMessages: { type: "int", default: 0 }
          }
        }
      ]
    };
  }

  setSocket = socket => {
    this.setState({ socket: socket });
  };

  componentDidUpdate() {
    const { socket, schema, userId } = this.state;
    if (!this.state.channelsSet && userId) {
      reConnectChannels(
        this.notify,
        socket,
        schema,
        this.initializeChannelsState,
        userId
      );
      this.setState({ channelsSet: true });
      setTimeout(() => {}, 1000);
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

  notifyDeleteHx = displayName => {
    this.props.showNotification({
      title: "🚀 Beam History Cleared",
      message: `for ${displayName}.`
    });
  };

  notifyDisconnect = displayName => {
    this.props.showNotification({
      title: "🚀 Disconnected",
      message: `GoodBye, ${displayName}!`
    });
  };

  render() {
    const { schema, socket, channels, userId } = this.state;
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <OfflineNotice />
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
            notify: this.notify,
            notifyDeleteHx: this.notifyDeleteHx,
            notifyDisconnect: this.notifyDisconnect
          }}
        />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({});

export default withInAppNotification(App);
