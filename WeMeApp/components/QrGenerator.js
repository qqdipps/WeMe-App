import React, { Component } from "react";
import QRCode from "react-native-qrcode-svg";
import { View, StyleSheet } from "react-native";
import {
  getChannel,
  listenForRegisteringChannel
} from "../functions/weMeConnections";
import { spawnComplete } from "../functions/spawnCompleteScript";

class QrGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueForQRCode: "",
      connectionId: "",
      displayName: "",
      encryptionKey: ""
    };
  }

  componentDidMount = () => {
    this.prepQr();
  };

  componentDidUpdate = () => {
    if (this.state.valueForQRCode) {
      const { socket, spawnUpdateStatus } = this.props;
      const channel = getChannel(this.state.connectionId, socket);

      listenForRegisteringChannel(
        channel,
        this.props.handleNavigateOnConnect,
        this.props.getNewConnectionInfoCallback,
        spawnUpdateStatus
      );
    }
  };

  setQrValue = () => {
    const valueForQR = {
      connectionId: this.state.connectionId,
      displayName: this.state.displayName,
      encryptionKey: this.state.encryptionKey
    };

    this.setState({
      valueForQRCode: JSON.stringify(valueForQR)
    });
  };

  getConnectEncrypt = () => {
    Realm.open({
      schema: this.props.schema,
      deleteRealmIfMigrationNeeded: true
    })
      .then(realm => {
        const connectAES = realm.objects("ConnectAES");
        let availConnect = realm
          .objects("ConnectAES")
          .filtered("inUse == false")[0];
        this.setState({
          connectionId: availConnect.connectionId,
          encryptionKey: availConnect.encryptionKey
        });
        this.setQrValue();
      })
      .catch(error => {});
  };

  prepQr = () => {
    Realm.open({
      schema: this.props.schema,
      deleteRealmIfMigrationNeeded: true
    })
      .then(realm => {
        this.setState({
          displayName: realm.objects("UserSelf")[0].displayName
        });
        this.getConnectEncrypt();
      })
      .catch(error => {});
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        {console.log("QR code value", this.state.valueForQRCode)}
        {this.state.valueForQRCode !== "" && (
          <QRCode value={this.state.valueForQRCode} size={300} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  }
});

export default QrGenerator;
