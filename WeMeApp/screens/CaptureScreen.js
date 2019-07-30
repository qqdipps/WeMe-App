import React, { Component } from "react";
import { View, ImageBackground } from "react-native";
import QrReader from "../components/QrReader";
import { storeConnectionData } from "../functions/realmStore";
import { createConnection } from "../functions/weMeConnections";

class CaptureScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectionId: undefined,
      connectionDisplayName: undefined
    };
  }

  static navigationOptions = {
    headerTitle: "Capture"
  };

  getQrData = qrData => {
    this.setState({
      connectionId: qrData.connectionId,
      connectionDisplayName: qrData.displayName
    });
    storeConnectionData(
      qrData.displayName,
      qrData.connectionId,
      qrData.encryptionKey,
      true
    );
  };

  handleNavigateOnConnect = () => {
    this.props.navigation.replace("Home", {
      newConnection: true,
      connectionId: this.state.connectionId,
      connectionDisplayName: this.state.connectionDisplayName
    });
  };

  componentDidUpdate = () => {
    const { schema, socket, notify } = this.props.navigation.getScreenProps();
    console.log(schema);
    createConnection(
      this.state.connectionId,
      this.handleNavigateOnConnect,
      notify,
      schema,
      socket
    );
  };

  render() {
    return (
      <ImageBackground
        source={require("../images/carina-nebula-647114_640.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View>
          <QrReader qrDataCallback={this.getQrData} />
        </View>
      </ImageBackground>
    );
  }
}

export default CaptureScreen;
