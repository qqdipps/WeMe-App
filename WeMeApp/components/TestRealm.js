import React, { Component } from "react";
import Realm from "realm";
import { Text, View } from "react-native";
class TestRealm extends Component {
  constructor() {
    super();
    this.state = { realm: null };
  }

  componentWillMount() {
    Realm.open({
      schema: [{ name: "Dog", properties: { name: "string" } }]
    }).then(realm => {
      realm.write(() => {
        realm.create("Dog", { name: "Rex" });
        realm.create("Dog", { name: "Rex" });
      });
      this.setState({ realm });
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
