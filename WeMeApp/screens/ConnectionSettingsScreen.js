import React, { Component } from "react";
import { StyleSheet, ImageBackground, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Overlay } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import Disconnect from "../components/Disconnect";
import DeleteHistory from "../components/DeleteHistory";
import Notes from "../components/Notes";
import SettingBtn from "../components/SettingBtn";
import { disconnect } from "../functions/disconnectScript";
import { deleteMessageHx } from "../functions/realmStore";

class SettingsScreen extends Component {
  static navigationOptions = {};

  constructor(props) {
    super(props);
    this.state = {
      displayName: this.props.navigation.getParam("displayName", ""),
      notes: this.props.navigation.getParam("notes", ""),
      showOverlay: false,
      disconnectWarning: `You will no longer be able to review notes, beam history, or send beams to ${this.props.navigation.getParam(
        "displayName",
        ""
      )} however this does not delete  ${this.props.navigation.getParam(
        "displayName",
        ""
      )}'s local beam history.`,
      deleteWarning: `You will no longer be able to review beam history for ${this.props.navigation.getParam(
        "displayName",
        ""
      )}, however this does not delete  ${this.props.navigation.getParam(
        "displayName",
        ""
      )}'s local beam history.`,
      overlayWarning: undefined,
      overlayAction: () => {},
      blurEffect: 0,
      showComponents: true
    };
  }

  componentDidMount = () => {
    console.log("NOTES:", this.state.notes);
  };

  viewOverlay = (warning, action) => {
    this.setState({
      blurEffect: 5,
      showOverlay: true,
      showComponents: false,
      overlayWarning: warning,
      overlayAction: action
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

  xOverlay = () => {
    this.setState({
      showOverlay: false,
      blurEffect: 0,
      showComponents: true
    });
  };

  navigateScreen = screen => {
    this.props.navigation.navigate(screen);
    this.setState({
      showOverlay: false,
      blurEffect: 0,
      showComponents: true
    });
  };

  render() {
    const {
      showComponents,
      showOverlay,
      disconnectWarning,
      overlayAction,
      deleteWarning
    } = this.state;
    return (
      <ImageBackground
        blurRadius={this.state.blurEffect}
        source={require("../images/carina-nebula-647114_640.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        {showComponents && (
          <View style={styles.view}>
            <Text numberOfLines={1} style={styles.text}>
              {this.state.displayName}
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
                onChangeText={text => this.setState({ displayName: text })}
              />
              <Notes style={styles.notes} notes={this.state.notes} />
            </View>
            <View style={styles.disconnect}>
              <Disconnect
                callBack={() =>
                  this.viewOverlay(disconnectWarning, this.disconnectAction)
                }
              />
              <DeleteHistory
                callBack={() =>
                  this.viewOverlay(deleteWarning, this.deleteAction)
                }
              />
            </View>
          </View>
        )}
        {showOverlay && (
          <Overlay isVisible height={380} overlayBackgroundColor={"#D0D7D7"}>
            <View style={styles.overlayLayout}>
              <Icon
                name="times"
                onPress={this.xOverlay}
                size={40}
                style={styles.xIcon}
              />
              <Text>Please be advised: </Text>
              <Text>{this.state.overlayWarning} </Text>
              <Text>Would you like to continue? </Text>
              <SettingBtn
                text={"Yes"}
                colors={["gray", "red"]}
                callBack={overlayAction}
              />
            </View>
          </Overlay>
        )}
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
    alignItems: "center"
  },
  text: {
    fontSize: RFPercentage(7),
    color: "white",
    fontFamily: "Gill Sans",
    textAlign: "center"
  }
});

export default SettingsScreen;
