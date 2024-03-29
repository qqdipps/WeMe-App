import React, { Component } from "react";
import { ImageBackground, StyleSheet, View, Text } from "react-native";
import { Overlay } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import DisplayName from "../components/DisplayName";
import Connect from "../components/Connect";
import Beams from "../components/Beams";
import { RFPercentage } from "react-native-responsive-fontsize";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOverlay: false,
      blurEffect: 0,
      showComponents: true,
      newConnection: { show: false },
      displayName: "",
      addedToParams: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Home",
      headerRight: (
        <View style={{ marginRight: 10 }}>
          <Icon.Button
            activeOpacity={0.1}
            backgroundColor={"transparent"}
            underlayColor={"#5d7173"}
            name="bars"
            size={30}
            color="white"
            onPress={() => {
              navigation.navigate("UserSettings", {
                displayName: navigation.getParam("displayName", ""),
                setDisplayName: navigation.state.params.setDisplayName
              });
            }}
          />
        </View>
      ),
      headerLeft: <Icon name="" />
    };
  };

  componentDidMount = () => {
    const newConnection = this.props.navigation.getParam(
      "newConnection",
      false
    );
    if (newConnection) {
      const connectionId = this.props.navigation.getParam(
        "connectionId",
        false
      );
      const name = this.props.navigation.getParam(
        "connectionDisplayName",
        false
      );
      this.setState({
        newConnection: {
          show: true,
          id: connectionId,
          name: name
        },
        blurEffect: 5,
        showComponents: false
      });
    }
  };

  componentDidUpdate = () => {
    if (!this.state.addedToParams) {
      this.props.navigation.setParams({
        displayName: this.state.displayName,
        setDisplayName: this.setDisplayName
      });
      this.setState({ addedToParams: true });
    }
    console.log("Updating after new DisplayName?", this.state);
  };

  blurBackground = () => {
    this.setState({
      blurEffect: 5,
      showOverlay: true,
      showComponents: false
    });
  };

  xOverlay = () => {
    this.setState({
      showOverlay: false,
      blurEffect: 0,
      showComponents: true
    });
  };

  xNewConnection = () => {
    this.setState({
      newConnection: { show: false },
      blurEffect: 0,
      showComponents: true
    });
  };

  setDisplayName = (displayName, updated) => {
    this.setState({ displayName: displayName });
    if (updated) {
      this.setState({ updated: updated });
    }
    this.setState({ addedToParams: false });
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
    const { schema, notify } = this.props.navigation.getScreenProps();
    const { showComponents, showOverlay, newConnection } = this.state;
    console.log(this.state);
    return (
      <ImageBackground
        blurRadius={this.state.blurEffect}
        source={require("../images/saturn-1463606_640.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        {showComponents && (
          <View style={styles.layout}>
            {!this.state.updated && (
              <DisplayName
                schema={schema}
                notify={notify}
                setStateDisplayNameCallback={this.setDisplayName}
                updatedDisplayName={this.state.displayName}
                // update={this.state.updated}
              />
            )}
            {this.state.updated && (
              <View style={styles.view}>
                <Text numberOfLines={1} style={styles.text}>
                  {this.state.displayName}
                </Text>
              </View>
            )}
            <Connect
              style={styles.connect}
              callBack={this.blurBackground}
              text={" Connect"}
              icon={"adduser"}
            />
            <Beams
              style={styles.beams}
              callBack={() => {
                this.navigateScreen("BeamCollection");
              }}
            />
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
              <Connect
                style={styles.myButton}
                callBack={() => {
                  this.navigateScreen("Spawn");
                }}
                text={" SPAWN"}
                icon={"qrcode"}
              />

              <Connect
                style={styles.myButton}
                callBack={() => {
                  this.navigateScreen("Capture", {
                    newProp: "NEW PROP"
                  });
                }}
                text={" CAPTURE"}
                icon={"scan1"}
              />
            </View>
          </Overlay>
        )}

        {newConnection.show && (
          <Overlay isVisible height={380} overlayBackgroundColor={"#D0D7D7"}>
            <View style={styles.overlayLayout}>
              <Icon
                name="times"
                onPress={this.xNewConnection}
                size={40}
                style={styles.xIcon}
              />
              <Text>New Connection: {newConnection.name} </Text>
            </View>
          </Overlay>
        )}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around"
  },

  beams: {
    marginBottom: -100
  },
  connect: {},
  overlayLayout: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  myButton: {},
  xIcon: {
    alignSelf: "flex-end"
  },
  menuIcon: {
    marginLeft: 50
  },
  text: {
    fontSize: RFPercentage(7),
    color: "white",
    fontFamily: "Gill Sans",
    textAlign: "center"
  }
});

export default HomeScreen;
