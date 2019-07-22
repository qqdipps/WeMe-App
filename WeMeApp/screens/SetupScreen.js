import React, { Component } from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import MyButton from "../components/MyButton";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Overlay } from "react-native-elements";
import { setupScript } from "../functions/setupScript";

class SetupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blurEffect: 0,
      showSetup: true,
      showOverlay: false,
      displayName: "DefaultUser",
      runScript: false
    };
    // console.log(this.props.navigation.getScreenProps());
  }

  blurBackground = () => {
    this.setState({ blurEffect: 25, showSetup: false, showOverlay: true });
  };

  overlayButtonPress = () => {
    this.setState({ showOverlay: false, blurEffect: 0, runScript: true });
  };

  navigateHome = () => {
    this.props.navigation.replace("Home");
  };

  xOverlay = () => {
    this.setState({
      blurEffect: 0,
      showSetup: true,
      showOverlay: false,
      displayName: "DefaultUser",
      runScript: false
    });
  };

  render() {
    const { showSetup, showOverlay, runScript, displayName } = this.state;
    const { socket, schema } = this.props.navigation.getScreenProps();
    return (
      <ImageBackground
        blurRadius={this.state.blurEffect}
        source={require("../images/astronaut-4106766_640.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.layout}>
          {showSetup && (
            <MyButton
              style={styles.myButton}
              callBack={this.blurBackground}
              text={"Let's Get Started!"}
            />
          )}
          {showOverlay && (
            <Overlay isVisible height={380} overlayBackgroundColor={"#FFf0e6"}>
              <View style={styles.layout}>
                <MyButton
                  style={styles.myButton}
                  callBack={this.overlayButtonPress}
                  text={"Submit"}
                />
                <Input
                  label="Enter your desired display name:"
                  placeholder="User 244"
                  leftIcon={<Icon name="user" size={40} color="black" />}
                  leftIconContainerStyle={{ marginRight: 5 }}
                  containerStyle={{ marginBottom: 10 }}
                  onChangeText={text => this.setState({ displayName: text })}
                />
                <Icon
                  name="times"
                  onPress={this.xOverlay}
                  size={40}
                  style={styles.xIcon}
                />
              </View>
            </Overlay>
          )}
          {runScript && setupScript(schema, displayName, this.navigateHome)}
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
  },
  xIcon: {
    alignSelf: "flex-end"
  }
});

export default SetupScreen;
