import React, { Component } from "react";
import QRCodeScanner from "react-native-qrcode-scanner";

class QrReader extends Component {
  onSuccess = e => {
    console.log("READING QRRRR", e);
  };
  render() {
    return <QRCodeScanner onRead={this.onSuccess} showMarker={true} />;
  }
}

export default QrReader;
