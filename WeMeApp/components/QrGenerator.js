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
    this.getDisplayName();
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
        console.log("HERE I AM>>>>>>>>>>");
        const connectAES = realm.objects("ConnectAES");
        console.log(connectAES[connectAES.length - 1]);
        let availConnect = connectAES[connectAES.length - 1];
        if (!availConnect.inUse) {
          this.setState({
            connectionId: availConnect.connectionId,
            encryptionKey: availConnect.encryptionKey
          });
          this.setQrValue();
        }
      })
      .catch(error => {});
  };

  getDisplayName = () => {
    Realm.open({
      schema: this.props.schema,
      deleteRealmIfMigrationNeeded: true
    })
      .then(realm => {
        console.log("HERE I AM>>>>>>>>>>");
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
        {console.log("STATE: ", this.state)}
        {this.state.valueForQRCode !== "" && (
          <QRCode
            value={this.state.valueForQRCode}
            size={250}
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
    margin: 10,
    alignItems: "center",
    paddingTop: 40
  },
  TextInputStyle: {
    width: "100%",
    height: 40,
    marginTop: 20,
    borderWidth: 1,
    textAlign: "center"
  },
  button: {
    width: "100%",
    paddingTop: 8,
    marginTop: 10,
    paddingBottom: 8,
    backgroundColor: "#F44336",
    marginBottom: 20
  },
  TextStyle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18
  }
});

export default QrGenerator;
