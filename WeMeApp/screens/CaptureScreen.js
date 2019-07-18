import React, { Component } from "react";
import { View } from "react-native";
import QrReader from "../components/QrReader";
import { storeConnectionData } from "../functions/realmStore";

class CaptureScreen extends Component {
  constructor() {
    super();
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
    console.log("IIIIII UUUUPPPDDDAAATTTEEED", console.log(this.state));
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
