import React, { Component } from "react";
import { StyleSheet, ImageBackground, View, Text } from "react-native";
import MyButton from "../components/MyButton";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Overlay } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import Disconnect from "../components/Disconnect";
import DeleteHistory from "../components/DeleteHistory";
import Notes from "../components/Notes";

class SettingsScreen extends Component {
  static navigationOptions = {};

  constructor(props) {
    super(props);
    this.state = {
      displayName: this.props.navigation.getParam("displayName", ""),
      isUser: this.props.navigation.getParam("isUser", true),
      notes: this.props.navigation.getParam("notes", "")
    };
  }

  componentDidMount = () => {
    console.log("NOTES:", this.state.notes);
  };

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
            {!this.state.isUser && <Notes notes={this.state.notes} />}
          </View>
          {!this.state.isUser && (
            <View>
              <Disconnect style={styles.disconnect} />
              <DeleteHistory />
            </View>
          )}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  card: {
    backgroundColor: "white",
    opacity: 0.8,
    marginTop: 20,
    padding: 10
  },
  disconnect: {},
  text: {
    fontSize: RFPercentage(7),
    color: "white",
    fontFamily: "Gill Sans",
    textAlign: "center"
  }
});

export default SettingsScreen;

{
  /* <View style={styles.view}>
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
  marginTop: 150,
  backgroundColor: "white",
  width: 300,
  height: 200
}}
onChangeText={text => this.setState({ displayName: text })}
/>
{!this.state.isUser && (
<Input
  label="Add User Note:"
  placeholder={this.props.navigation.getParam("notes", "")}
  leftIcon={<Icon name="clipboard" size={40} color="black" />}
  leftIconContainerStyle={{ marginRight: 5 }}
  containerStyle={{
    height: 300,
    backgroundColor: "white",
    width: 300
  }}
  onChangeText={text => this.setState({ notes: text })}
/>
)} */
}
