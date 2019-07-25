import React, { Component } from "react";
import { View } from "react-native";
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
    const { schema, socket } = this.props.navigation.getScreenProps();
    createConnection(
      this.state.connectionId,
      this.handleNavigateOnConnect,
      schema,
      socket
    );
  };

  render() {
    return (
      <View>
        <QrReader qrDataCallback={this.getQrData} />
      </View>
    );
  }
}

export default CaptureScreen;
