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

  handleNavigateBeamUI = beamData => {
    this.props.navigation.navigate("BeamUI", {
      beamData: JSON.stringify(beamData)
    });
  };

  render() {
    return (
      <FlatList
        data={this.state.beamCollection}
        renderItem={({ item }) => (
          <Beam
            text={item.sender.displayName}
            beamData={item}
            callBack={this.handleNavigateBeamUI}
          />
        )}
        keyExtractor={({ item }) => {
          item;
        }}
      />
    );
  }
}

export default BeamCollectionScreen;
