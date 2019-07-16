import React, { Component } from "react";
import { View, Text, ImageBackground } from "react-native";

class InitializeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ImageBackground
        source={require("../images/astronaut-4106766_640.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View>
          <Text>Loading ....</Text>
        </View>
      </ImageBackground>
    );
  }
}

export default InitializeScreen;
