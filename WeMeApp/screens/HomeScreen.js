import React, { Component } from "react";
import { ImageBackground, StyleSheet, View, Text } from "react-native";
import { Overlay } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import DisplayName from "../components/DisplayName";
import Connect from "../components/Connect";
import Beams from "../components/Beams";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOverlay: false,
      blurEffect: 0,
      showComponents: true,
      newConnection: { show: false }
    };
  }

  static navigationOptions = {
    title: "Home"
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
    return (
      <ImageBackground
        blurRadius={this.state.blurEffect}
        source={require("../images/saturn-1463606_640.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        {showComponents && (
          <View style={styles.layout}>
            <DisplayName schema={schema} notify={notify} />
            <Connect
              style={styles.connect}
              callBack={this.blurBackground}
              text={" Connect"}
              icon={"account-plus"}
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
          <Overlay isVisible height={380} overlayBackgroundColor={"#FFf0e6"}>
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
                icon={"qr-scan"}
              />
            </View>
          </Overlay>
        )}

        {newConnection.show && (
          <Overlay isVisible height={380} overlayBackgroundColor={"#FFf0e6"}>
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
  }
});

export default HomeScreen;
