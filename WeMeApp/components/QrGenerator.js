import React, { Component } from "react";
import QRCode from "react-native-qrcode";
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
    console.log(
      "testing channels, comp did mount",
      this.props.channels[0].bindings
    );
  };

  componentDidUpdate = () => {
    if (this.state.valueForQRCode) {
      const { socket } = this.props;

      const channel = getChannel(this.state.connectionId, socket);
      channel
        .join()
        .receive("ok", resp => {
          console.log("Joined successfully channel: ", this.state.connectionId);
          listenForRegisteringChannel(
            channel,
            this.props.handleNavigateOnConnect,
            this.props.getNewConnectionInfoCallback
          );
        })
        .receive("error", resp => {
          console.log("Unable to join", resp);
        });
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
          <QRCode
            value={this.state.valueForQRCode}
            size={400}
            bgColor="#000"
            fgColor="#fff"
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    margin: 50,
    alignItems: "center",
    paddingTop: 40
    // width: 300
  }
});

export default QrGenerator;
