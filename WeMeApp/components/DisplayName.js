import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Realm from "realm";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

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
        console.log(this.state.displayName);
      })
      .catch(error => {});
  };

  render() {
    return (
      <View style={styles.view}>
        <Text numberOfLines={1} style={styles.text}>
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
    // backgroundColor: "blue"
  },
  text: {
    fontSize: RFPercentage(7),
    color: "#E8C9DE",
    fontFamily: "Gill Sans",
    textAlign: "center"
  }
});

export default DisplayName;
