import React, { Component } from "react";
import { StyleSheet, ImageBackground, View, Text } from "react-native";
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
    return (
      <ImageBackground
        // blurRadius={this.state.blurEffect}
        source={require("../images/carina-nebula-647114_640.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.view}>
          <Text numberOfLines={1} style={styles.text}>
            {this.state.displayName}
          </Text>
        </View>
        <Input
          label="Change Display Name:"
          placeholder={this.props.navigation.getParam("displayName", "")}
          leftIcon={<Icon name="user" size={40} color="black" />}
          leftIconContainerStyle={{ marginRight: 5 }}
          containerStyle={{
            marginTop: 200,
            backgroundColor: "white",
            width: 300
          }}
          onChangeText={text => this.setState({ displayName: text })}
        />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    // width: 400,
    // height: 100,
    // backgroundColor: "rgb(232, 201, 222)e"
  },
  text: {
    fontSize: 28,
    color: "white",
    fontFamily: "Gill Sans",
    textAlign: "center"
  }
});

export default SettingsScreen;
