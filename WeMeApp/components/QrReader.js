import React from "react";
import QRCodeScanner from "react-native-qrcode-scanner";

const QrReader = ({ qrDataCallback }) => {
  onSuccess = e => {
    const sharedData = JSON.parse(e.data);
    qrDataCallback(sharedData);
  };

  return <QRCodeScanner onRead={this.onSuccess} showMarker={true} />;
};

export default QrReader;
