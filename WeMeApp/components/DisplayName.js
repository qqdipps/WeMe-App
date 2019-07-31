import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Realm from "realm";
import { RFPercentage } from "react-native-responsive-fontsize";

class DisplayName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: undefined,
      updated: this.props.update
    };
  }

  componentDidMount = () => {
    this.getDisplayName();
  };

  componentDidUpdate = () => {
    if (this.state.updated) {
      console.log("Updating User Display?");
      this.setState({
        displayName: this.props.updatedDisplayName,
        updated: false
      });
    }
  };

  getDisplayName = () => {
    Realm.open({
      schema: this.props.schema,
      deleteRealmIfMigrationNeeded: true
    })
      .then(realm => {
        const displayName = realm.objects("UserSelf")[0].displayName;
        this.setState({
          displayName: displayName
        });
        this.props.setStateDisplayNameCallback(displayName);
      })
      .catch(error => {});
  };

  render() {
    return (
      <View style={styles.view}>
        <Text
          numberOfLines={1}
          style={styles.text}
          onPress={() => this.props.notify(this.state.displayName)}
        >
          {this.state.displayName}
        </Text>
      </View>
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
    fontSize: RFPercentage(7),
    color: "white",
    fontFamily: "Gill Sans",
    textAlign: "center"
  }
});

export default DisplayName;
