import React, { Component } from "react";
import { View } from "react-native";
import QrReader from "../components/QrReader";
import { storeConnectionData } from "../functions/realmStore";
import { createConnection } from "../functions/weMeConnections";
import axios from "axios";

class CaptureScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectionId: undefined
    };
  }

  getQrData = qrData => {
    this.setState({
      connectionId: qrData.connectionId
    });
    storeConnectionData(
      qrData.displayName,
      qrData.connectionId,
      qrData.encryptionKey,
      true
    );
  };

  componentDidUpdate = () => {
    // postLink()
    const { schema, socket } = this.props.navigation.getScreenProps();
    createConnection(this.state.connectionId, schema, socket);
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
