import React, { Component } from "react";
import { View } from "react-native";
import QrReader from "../components/QrReader";

class CaptureScreen extends Component {
  constructor() {
    super();
  }

  render() {
    // const { schema } = this.props.navigation.getScreenProps();
    return (
      <View>
        <QrReader />
      </View>
    );
  }
}

export default CaptureScreen;
