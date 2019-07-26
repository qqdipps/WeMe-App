import React, { Component } from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import MyButton from "../components/MyButton";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Overlay } from "react-native-elements";

class SettingsScreen extends Component {
  static navigationOptions = {};

  constructor(props) {
    super(props);
    this.state = {
      displayName: this.props.navigation.getParam("displayName", ""),
      isUser: this.props.navigation.getParam("isUser", false),
      notes: this.props.navigation.getParam("notes", "")
    };
  }

  render() {
    <ImageBackground
      // blurRadius={this.state.blurEffect}
      source={require("../images/mandalas-1485099_640.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <Input
        label="Enter your desired display name:"
        placeholder="User 244"
        leftIcon={<Icon name="user" size={40} color="black" />}
        leftIconContainerStyle={{ marginRight: 5 }}
        containerStyle={{ marginBottom: 10 }}
        onChangeText={text => this.setState({ displayName: text })}
      />
    </ImageBackground>;
  }
}

export default SettingsScreen;
