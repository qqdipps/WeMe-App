import React, { Component } from "react";
import { List, ListItem } from "react-native-elements";
import { FlatList, Text, ImageBackground } from "react-native";
import Beam from "../components/Beam";

class BeamCollectionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { beamCollection: undefined };
  }

  static navigationOptions = {};

  componentDidMount = () => {
    const { schema, socket } = this.props.navigation.getScreenProps();
    Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
      .then(realm => {
        const entries = realm.objects("ConnectionMessages");
        beamCollection = entries.map(entry => {
          console.log("checking out entry list", entry);
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
      <ImageBackground
        // blurRadius={this.state.blurEffect}
        source={require("../images/carina-nebula-647114_640.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
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
      </ImageBackground>
    );
  }
}

export default BeamCollectionScreen;
