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
