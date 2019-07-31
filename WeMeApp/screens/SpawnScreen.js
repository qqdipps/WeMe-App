import React, { Component } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import QrGenerator from "../components/QrGenerator";
import { spawnComplete } from "../functions/spawnCompleteScript";

class SpawnScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectionId: undefined,
      connectionDisplayName: undefined,
      isSpawnComplete: false,
      isUpdated: false,
      counter: 0
    };
  }

  handleNavigateOnConnect = () => {
    this.props.navigation.replace("Home", {
      newConnection: true,
      connectionId: this.state.connectionId,
      connectionDisplayName: this.state.connectionDisplayName
    });
  };

  static navigationOptions = {
    headerTitle: "Spawn"
  };

  getNewConnectionInfo = (connectionId, connectionDisplayName) => {
    this.setState({
      connectionId: connectionId,
      connectionDisplayName: connectionDisplayName,
      counter: this.state.counter + 1
    });
    this.setState({ isUpdated: true });
  };

  componentDidUpdate = () => {
    const { schema, socket, notify } = this.props.navigation.getScreenProps();
    const {
      connectionId,
      connectionDisplayName,
      isSpawnComplete,
      isUpdated
    } = this.state;

    if (!isSpawnComplete && !isUpdated) {
      spawnComplete(
        socket,
        schema,
        connectionId,
        connectionDisplayName,
        this.handleNavigateOnConnect,
        notify
      );
      this.setState({ isSpawnComplete: true });
      setTimeout(() => {}, 1000);
    } else {
      console.log(" error trying to update again", this.state);
    }
  };

  render() {
    const { schema, socket, channels } = this.props.navigation.getScreenProps();
    return (
      <ImageBackground
        source={require("../images/carina-nebula-647114_640.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <QrGenerator
          style={styles.qr}
          schema={schema}
          socket={socket}
          handleNavigateOnConnect={undefined}
          getNewConnectionInfoCallback={this.getNewConnectionInfo}
          channels={channels}
          spawnUpdateStatus={this.state.isUpdated}
        />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  qr: {
    // width: 200,
    // padding: 400
  }
});

export default SpawnScreen;
