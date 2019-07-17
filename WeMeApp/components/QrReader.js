import React from "react";
import QRCodeScanner from "react-native-qrcode-scanner";

const QrReader = ({ qrDataCallback }) => {
  onSuccess = e => {
    console.log("READING QRRRR", e);
    const sharedData = JSON.parse(e.data);
    console.log(sharedData);
    qrDataCallback(sharedData);
  };

  return <QRCodeScanner onRead={this.onSuccess} showMarker={true} />;
};

export default QrReader;
