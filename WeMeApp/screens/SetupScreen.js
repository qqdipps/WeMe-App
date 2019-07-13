import React, { Component } from "react";
import { StyleSheet, StatusBar, ImageBackground, View } from "react-native";
import MyButton from "../components/MyButton";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Overlay } from "react-native-elements";

class SetupScreen extends Component {
  constructor() {
    super();
    this.state = {
      blurEffect: 0,
      showSetup: true
    };
  }

  blurBackground = () => {
    this.setState({ blurEffect: 25, showSetup: false });
  };

  render() {
    const { blurEffect, showSetup } = this.state;
    return (
      <ImageBackground
        blurRadius={this.state.blurEffect}
        source={require("../images/astronaut-4106766_640.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <StatusBar barStyle="light-content" />
        <View style={styles.layout}>
          {showSetup && (
            <MyButton
              style={styles.myButton}
              blurBackgroundCallback={this.blurBackground}
              text={"Let's Get Started!"}
            />
          )}
          {!showSetup && (
            <Overlay isVisible>
              <Input
                placeholder="INPUT WITH CUSTOM ICON"
                leftIcon={<Icon name="user" size={40} color="black" />}
              />
              <MyButton
                style={styles.myButton}
                // callBack={this.blurBackground}
                text={"Submit"}
              />
            </Overlay>
          )}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: "column-reverse",
    alignItems: "center"
  },
  myButton: {
    marginBottom: 200
  }
});

export default SetupScreen;
