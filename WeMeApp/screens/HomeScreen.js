import React, { Component } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
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
      showComponents: true
    };
  }

  blurBackground = () => {
    this.setState({
      blurEffect: 5,
      showSetup: false,
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

  navigateSpawn = () => {
    this.props.navigation.navigate("Spawn");
    this.setState({ showOverlay: false });
  };

  render() {
    const { schema } = this.props.navigation.getScreenProps();
    const { showComponents, showOverlay } = this.state;
    return (
      <ImageBackground
        blurRadius={this.state.blurEffect}
        source={require("../images/stars-828650_640.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        {showComponents && (
          <View style={styles.layout}>
            <DisplayName schema={schema} />
            <Connect
              style={styles.connect}
              callBack={this.blurBackground}
              text={" Connect"}
              icon={"account-plus"}
            />
            <Beams />
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
                callBack={this.navigateSpawn}
                text={" SPAWN"}
                icon={"qrcode"}
              />

              <Connect
                style={styles.myButton}
                callBack={this.overlayButtonPress}
                text={" CAPTURE"}
                icon={"qr-scan"}
              />
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
    justifyContent: "space-between"
  },
  connect: {},
  overlayLayout: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  myButton: {
    // marginBottom:
  },
  xIcon: {
    alignSelf: "flex-end"
  }
});

export default HomeScreen;
