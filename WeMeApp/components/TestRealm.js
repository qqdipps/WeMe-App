import React, { Component } from "react";
import Realm from "realm";
import { Text, View } from "react-native";
class TestRealm extends Component {
  constructor(props) {
    super(props);
    this.state = { realm: null };
  }

  componentWillMount() {
    Realm.open({
      schema: this.props.schema
    })
      .then(realm => {
        realm.deleteAll();
        console.log("deleting realm");
        this.setState({ realm });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const info = this.state.realm
      ? "Number of dogs in this Realm: " +
        this.state.realm.objects("Dog").length
      : "Loading...";

    return (
      <View>
        <Text>{info}</Text>
      </View>
    );
  }
}

export default TestRealm;
