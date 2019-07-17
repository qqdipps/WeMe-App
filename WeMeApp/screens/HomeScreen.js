import React, { Component } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
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

  render() {
    const { schema } = this.props.navigation.getScreenProps();
    return (
      <ImageBackground
        blurRadius={this.state.blurEffect}
        source={require("../images/stars-828650_640.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        {showComponents && (
          <View style={styles.layout}>
            <DisplayName schema={schema} />
            <Connect style={styles.connect} callBack={this.blurBackground} />
            <Beams />
          </View>
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
  connect: {}
});

export default HomeScreen;
