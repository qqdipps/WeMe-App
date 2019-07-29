import React, { Component } from "react";
import { ListItem, Avatar } from "react-native-elements";
import { ImageBackground, View, FlatList } from "react-native";

class BeamCollectionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beamCollection: [],
      forceUpdate: true,
      updated: false
    };
  }

  static navigationOptions = {};

  componentDidMount = () => {
    this.getBeamCollectionData();
    this.props.navigation.addListener("didFocus", payload => {
      this.forceUpdate();
    });
  };

  getBeamCollectionData = () => {
    const { schema, socket } = this.props.navigation.getScreenProps();

    Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
      .then(realm => {
        const entries = realm.objects("ConnectionMessages");
        beamCollection = entries.map((entry, i) => {
          return {
            name: entry.sender.displayName,
            subtitle: entry.sender.notes[0],
            beamData: entry,
            i: i
          };
        });
        this.setState({ beamCollection: beamCollection });
      })
      .catch(error => console.log("Beam collection Realm error:", error));
  };

  componentDidUpdate = () => {
    if (
      this.props.navigation.getParam("displayName", false) &&
      !this.state.updated
    ) {
      this.getBeamCollectionData();
      this.setState({ updated: true });
    }
  };

  forceUpdate = () => {
    this.setState({ forceUpdate: !this.state.forceUpdate });
  };

  handleNavigateBeamUI = (beamData, i) => {
    this.props.navigation.navigate("BeamUI", {
      beamData: JSON.stringify(beamData),
      i: i
    });
    this.setState({ updated: false });
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
      onPress={() => this.handleNavigateBeamUI(item.beamData, item.i)}
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
