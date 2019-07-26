import React, { Component } from "react";
import { View } from "react-native";
import QrGenerator from "../components/QrGenerator";
import { spawnComplete } from "../functions/spawnCompleteScript";

class SpawnScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectionId: undefined,
      connectionDisplayName: undefined,
      isSpawnComplete: false
    };
  }

  handleNavigateOnConnect = () => {
    this.props.navigation.replace("Home", {
      newConnection: true,
      connectionId: this.state.connectionId,
      connectionDisplayName: this.state.connectionDisplayName
    });
  };

  static navigationOptions = {};

  getNewConnectionInfo = (connectionId, connectionDisplayName) => {
    this.setState({
      connectionId: connectionId,
      connectionDisplayName: connectionDisplayName
    });
  };

  componentDidUpdate = () => {
    const { schema, socket } = this.props.navigation.getScreenProps();
    const { connectionId, connectionDisplayName, isSpawnComplete } = this.state;
    if (!isSpawnComplete) {
      spawnComplete(
        socket,
        schema,
        connectionId,
        connectionDisplayName,
        this.handleNavigateOnConnect
      );
      this.setState({ isSpawnComplete: true });
    } else {
      console.log("trying to update again");
    }
  };

  render() {
    const { schema, socket, channels } = this.props.navigation.getScreenProps();
    return (
      <View>
        <QrGenerator
          schema={schema}
          socket={socket}
          handleNavigateOnConnect={undefined}
          getNewConnectionInfoCallback={this.getNewConnectionInfo}
          channels={channels}
        />
      </View>
    );
  }
}

export default SpawnScreen;
