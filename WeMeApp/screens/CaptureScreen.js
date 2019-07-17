import React, { Component } from "react";
import { View } from "react-native";
import QrReader from "../components/QrReader";
import {
  storeConnectAES,
  storeConnectionMessages
} from "../functions/realmStore";

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

    storeConnectionMessages(qrData.displayName, qrData.connectionId);
    storeConnectAES(qrData.encryptionKey, qrData.connectionId, true);
  };

  render() {
    // const { schema } = this.props.navigation.getScreenProps();
    return (
      <View>
        <QrReader qrDataCallback={this.getQrData} />
        {console.log(this.state, ",---- yay boi")}
      </View>
    );
  }
}

export default CaptureScreen;
