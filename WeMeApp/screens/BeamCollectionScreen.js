import React, { Component } from "react";
import { FlatList, Text } from "react-native";

class BeamCollectionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { beamCollection: undefined };
  }

  componentDidMount = () => {
    const { schema, socket } = this.props.navigation.getScreenProps();
    Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
      .then(realm => {
        const entries = realm.objects("ConnectionMessages");
        beamCollection = entries.map(entry => {
          return entry.connectionId;
        });
        this.setState({ beamCollection: beamCollection });
      })
      .catch(error => console.log("Beam collection Realm error:", error));
  };

  render() {
    return (
      <FlatList
        data={this.state.beamCollection}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={({ item }) => {
          item;
        }}
      />
    );
  }
}

export default BeamCollectionScreen;
