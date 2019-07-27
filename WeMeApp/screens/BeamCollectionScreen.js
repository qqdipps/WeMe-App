import React, { Component } from "react";
import { ListItem, Avatar } from "react-native-elements";
import { ImageBackground, View, FlatList } from "react-native";

class BeamCollectionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beamCollection: []
    };
  }

  static navigationOptions = {};

  componentDidMount = () => {
    const { schema, socket } = this.props.navigation.getScreenProps();
    Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
      .then(realm => {
        const entries = realm.objects("ConnectionMessages");
        beamCollection = entries.map(entry => {
          return {
            name: entry.sender.displayName,
            subtitle: entry.sender.notes[0],
            beamData: entry
          };
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

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      subtitle={item.subtitle}
      topDivider
      bottomDivider
      leftAvatar={
        <Avatar
          size="small"
          rounded
          title={item.name.substring(0, 2).toUpperCase()}
          activeOpacity={0.7}
        />
      }
      onPress={() => this.handleNavigateBeamUI(item.beamData)}
    />
  );

  render() {
    return (
      <ImageBackground
        source={require("../images/carina-nebula-647114_640.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.beamCollection}
          renderItem={this.renderItem}
        />
      </ImageBackground>
    );
  }
}

export default BeamCollectionScreen;
