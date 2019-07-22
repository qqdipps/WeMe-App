import React, { Component } from "react";
import { FlatList, Text } from "react-native";
import Beam from "../components/Beam";

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
          console.log(entry);
          return entry;
        });
        this.setState({ beamCollection: beamCollection });
      })
      .catch(error => console.log("Beam collection Realm error:", error));
  };

  render() {
    return (
      <FlatList
        data={this.state.beamCollection}
        renderItem={({ item }) => (
          <Beam text={item.sender.displayName} beamData={item} />
        )}
        keyExtractor={({ item }) => {
          item;
        }}
      />
    );
  }
}

export default BeamCollectionScreen;
