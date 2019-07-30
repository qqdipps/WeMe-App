import React, { Component } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Button,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Overlay } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import Disconnect from "../components/Disconnect";
import DeleteHistory from "../components/DeleteHistory";
import Notes from "../components/Notes";
import SettingBtn from "../components/SettingBtn";
import { disconnect } from "../functions/disconnectScript";
import { deleteMessageHx } from "../functions/realmStore";
import { HeaderBackButton } from "react-navigation";
import AwesomeAlert from "react-native-awesome-alerts";

class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <HeaderBackButton
          tintColor={"white"}
          onPress={() =>
            navigation.navigate("BeamUI", {
              displayName: navigation.getParam("displayName", "")
            })
          }
        />
      ),
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            this._onPressButton;
            navigation.state.params.saveFunction();
          }}
        >
          <Text style={{ color: "#fff", fontSize: 24, marginRight: 25 }}>
            Save
          </Text>
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      displayName: this.props.navigation.getParam("displayName", ""),
      notes: this.props.navigation.getParam("notes", ""),
      showAlert: false,
      disconnectWarning: `You will no longer be able to review notes, beam history, or send beams to ${this.props.navigation.getParam(
        "displayName",
        ""
      )}, however this does not delete ${this.props.navigation.getParam(
        "displayName",
        ""
      )}'s local beam history.`,
      deleteWarning: `You will no longer be able to review beam history for ${this.props.navigation.getParam(
        "displayName",
        ""
      )}, however this does not delete ${this.props.navigation.getParam(
        "displayName",
        ""
      )}'s local beam history.`,
      alertWarning: undefined,
      alertAction: () => {},
      newDisplayName: undefined,
      update: false,
      isSave: true,
      yesAlertText: undefined
    };
  }

  componentDidMount = () => {
    console.log("NOTES:", this.state.notes);
  };

  componentDidUpdate = () => {
    if (this.state.newDisplayName && this.state.update) {
      console.log("updating navigation params");
      this.props.navigation.setParams({
        displayName: this.state.newDisplayName
      });
      this.setState({ update: false });
    }

    if (this.state.saveAction && this.state.isSave) {
      this.props.navigation.setParams({
        saveFunction: this.state.saveAction
      });
      this.setState({ isSave: false });
    }
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  saveChanges = saveAction => {
    this.setState({ saveAction: saveAction });
  };

  updatedDisplayName = () => {
    this.setState({ update: true });
  };

  viewAlert = (warning, action, yesText) => {
    this.setState({
      showAlert: true,
      alertWarning: warning,
      alertAction: action,
      yesAlertText: yesText
    });
  };

  disconnectAction = () => {
    const {
      schema,
      socket,
      notifyDisconnect
    } = this.props.navigation.getScreenProps();
    disconnect(
      this.props.navigation.getParam("connectionId", ""),
      this.state.displayName,
      schema,
      socket
    );
    this.navigateScreen("Home");
    notifyDisconnect(this.state.displayName);
  };

  deleteAction = () => {
    const { notifyDeleteHx } = this.props.navigation.getScreenProps();
    deleteMessageHx(this.props.navigation.getParam("connectionId", ""));
    this.navigateScreen("Home");
    notifyDeleteHx(this.state.displayName);
  };

  navigateScreen = screen => {
    this.props.navigation.navigate(screen);
  };

  render() {
    const {
      disconnectWarning,
      alertAction,
      deleteWarning,
      showAlert,
      yesAlertText
    } = this.state;
    return (
      <ImageBackground
        blurRadius={this.state.blurEffect}
        source={require("../images/carina-nebula-647114_640.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <ScrollView nestedScrollEnabled>
          <View style={styles.view}>
            <Text numberOfLines={1} style={styles.text}>
              {this.state.newDisplayName || this.state.displayName}
            </Text>
            <View style={styles.card}>
              <Input
                label="Change Display Name:"
                placeholder={this.props.navigation.getParam("displayName", "")}
                leftIcon={<Icon name="user" size={40} color="black" />}
                leftIconContainerStyle={{ marginRight: 5 }}
                containerStyle={{
                  padding: 10,
                  width: 300,
                  height: 100,
                  alignSelf: "center",
                  fontSize: 18
                }}
                onChangeText={text => this.setState({ newDisplayName: text })}
              />
              <Notes
                style={styles.notes}
                notes={this.state.notes}
                displayName={this.state.newDisplayName}
                connectionId={this.props.navigation.getParam(
                  "connectionId",
                  ""
                )}
                updateCallBack={this.updatedDisplayName}
                saveChanges={this.saveChanges}
              />
            </View>
            <View style={styles.disconnect}>
              <Disconnect
                callBack={() =>
                  this.viewAlert(
                    disconnectWarning,
                    this.disconnectAction,
                    "Disconnect"
                  )
                }
                styles={{ marginBottom: 20 }}
              />
              <DeleteHistory
                callBack={() =>
                  this.viewAlert(deleteWarning, this.deleteAction, "Delete")
                }
              />
            </View>
          </View>
        </ScrollView>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Please be advised:"
          message={this.state.alertWarning}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, Cancel"
          confirmText={`Yes, ${yesAlertText}`}
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
            alertAction();
          }}
        />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  overlayLayout: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  xIcon: {
    alignSelf: "flex-end"
  },
  view: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  notes: {},
  card: {
    backgroundColor: "white",
    opacity: 0.8,
    marginTop: 20,
    padding: 10,
    height: 450
  },
  disconnect: {
    marginTop: 40,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    // height: 300,
    alignContent: "space-around"
  },
  text: {
    fontSize: RFPercentage(7),
    color: "white",
    fontFamily: "Gill Sans",
    textAlign: "center"
  }
});

export default SettingsScreen;
