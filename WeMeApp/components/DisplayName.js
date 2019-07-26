import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Realm from "realm";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import LinearGradient from "react-native-linear-gradient";

class DisplayName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: undefined
    };
  }

  componentDidMount = () => {
    this.getDisplayName();
  };

  getDisplayName = () => {
    Realm.open({
      schema: this.props.schema,
      deleteRealmIfMigrationNeeded: true
    })
      .then(realm => {
        this.setState({
          displayName: realm.objects("UserSelf")[0].displayName
        });
      })
      .catch(error => {});
  };

  render() {
    return (
      <View style={styles.view}>
        <Text numberOfLines={1} style={styles.text} onPress={this.props.notify}>
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
    color: "rgb(232, 201, 222)",
    fontFamily: "Gill Sans",
    textAlign: "center"
  }
});

export default DisplayName;
