import React, { Component } from "react";
import { View } from "react-native";
import QrGenerator from "../components/QrGenerator";

class SpawnScreen extends Component {
  constructor() {
    super();
  }

  render() {
    const { schema } = this.props.navigation.getScreenProps();
    return (
      <View>
        <QrGenerator schema={schema} />
      </View>
    );
  }
}

export default SpawnScreen;
