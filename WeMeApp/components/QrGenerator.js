import React, { Component } from "react";
import QRCode from "react-native-qrcode";
import { View, StyleSheet } from "react-native";

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
        console.log(connectAES[connectAES.length - 1]);
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
        console.log(this.state.displayName);
        this.getConnectEncrypt();
      })
      .catch(error => {});
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        {console.log(this.state.valueForQRCode)}
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
