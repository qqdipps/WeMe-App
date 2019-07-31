import React, { Component } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import ResetApp from "../components/ResetApp";
import { updateUserDisplayName } from "../functions/realmStore";

class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "User Settings & About",
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            this._onPressButton;
            navigation.state.params.setDisplayName(
              navigation.state.params.displayName,
              true
            );
            navigation.state.params.updateUserDisplayName(
              navigation.state.params.displayName
            );
          }}
        >
          <Text style={{ color: "#fff", fontSize: 24, marginRight: 25 }}>
            Save
          </Text>
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      displayName: ""
    };

    this.props.navigation.setParams({
      updateUserDisplayName: updateUserDisplayName
    });
  }

  render() {
    return (
      <ImageBackground
        // blurRadius={this.state.blurEffect}
        source={require("../images/carina-nebula-647114_640.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <ScrollView nestedScrollEnabled>
          <View style={styles.view}>
            <Text numberOfLines={1} style={styles.text}>
              {this.state.displayName ||
                this.props.navigation.state.params.displayName}
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
                value={this.state.displayName}
                onChangeText={text => {
                  this.setState({ displayName: text });
                  this.props.navigation.setParams({ displayName: text });
                }}
              />
            </View>
            <View style={styles.textCard}>
              <Text
                style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}
              >
                About WeMe:
              </Text>
              <Text style={{ fontSize: 14 }}>
                We believe in the personal ownership of data. It is not ours to
                collect. No messages are stored on our servers nor read as they
                are routed. In fact even if we or another entity wanted to read
                them, we can not. All messages are encrypted using 256 bit AES
                symmetrical encryption. To ensure that only you and the intended
                recipient can read the messages a super secret key is generated
                and stored locally on your phone. The super secret key is shared
                through the camera via the QR code. To maintain privacy do not
                share screenshots of your QR codes.{" "}
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 14, marginTop: 10 }}>
                Please beam responsibly.
              </Text>
              <Text style={{ marginLeft: 10 }}>- WeMe family</Text>
            </View>
            <ResetApp />
          </View>
        </ScrollView>
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
    padding: 10,
    height: 122
  },
  textCard: {
    backgroundColor: "white",
    opacity: 0.8,
    marginTop: 20,
    padding: 10,
    height: 400,
    width: 320
  },
  text: {
    fontSize: RFPercentage(7),
    color: "white",
    fontFamily: "Gill Sans",
    textAlign: "center"
  }
});

export default SettingsScreen;
