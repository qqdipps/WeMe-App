import React, { Component } from "react";
import { View } from "react-native";
import QrGenerator from "../components/QrGenerator";
import { spawnComplete } from "../functions/spawnCompleteScript";

class SpawnScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectionId: undefined,
      connectionDisplayName: undefined
    };
  }

  handleNavigateOnConnect = () => {
    this.props.navigation.replace("Home", {
      newConnection: true,
      connectionId: this.state.connectionId,
      connectionDisplayName: this.state.connectionDisplayName
    });
  };

  getNewConnectionInfo = (connectionId, connectionDisplayName) => {
    this.setState({
      connectionId: connectionId,
      connectionDisplayName: connectionDisplayName
    });
  };

  componentDidUpdate = () => {
    const { schema, socket } = this.props.navigation.getScreenProps();
    const { connectionId, connectionDisplayName } = this.state;
    spawnComplete(socket, schema, connectionId, connectionDisplayName);
  };

  render() {
    const { schema, socket } = this.props.navigation.getScreenProps();
    return (
      <View>
        <QrGenerator
          schema={schema}
          socket={socket}
          handleNavigateOnConnect={this.handleNavigateOnConnect}
          getNewConnectionInfoCallback={this.getNewConnectionInfo}
        />
      </View>
    );
  }
}

export default SpawnScreen;
