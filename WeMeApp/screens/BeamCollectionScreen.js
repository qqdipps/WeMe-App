import React, { Component } from "react";
import { ListItem, Avatar, Badge } from "react-native-elements";
import { ImageBackground, View, FlatList, Text } from "react-native";

class BeamCollectionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beamCollection: [],
      forceUpdate: true,
      updated: false
    };
  }

  static navigationOptions = {
    headerTitle: "Beams"
  };

  componentDidMount = () => {
    this.getBeamCollectionData();
    this.props.navigation.addListener("didFocus", payload => {
      this.forceUpdate();
    });
  };

  getBeamCollectionData = () => {
    const { schema } = this.props.navigation.getScreenProps();

    Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
      .then(realm => {
        const entries = realm.objects("ConnectionMessages");
        let beamCollection = entries.map((entry, i) => {
          return {
            beamData: entry,
            i: i,
            connected: entry.sender.connected,
            epochLastMessage: new Date(
              entry.messages[entry.messages.length - 1].dateTime
            ).getTime()
          };
        });
        beamCollection = beamCollection.sort(
          (a, b) => b.epochLastMessage - a.epochLastMessage
        );
        this.setState({ beamCollection: beamCollection });
      })
      .catch(error => console.log("Beam collection Realm error:", error));
  };

  componentDidUpdate = () => {
    if (!this.state.updated) {
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
      title={item.beamData.sender.displayName}
      subtitle={item.beamData.sender.notes[0]}
      topDivider
      bottomDivider
      leftAvatar={
        <View>
          <Avatar
            size="small"
            rounded
            title={item.beamData.sender.displayName
              .substring(0, 2)
              .toUpperCase()}
            activeOpacity={0.7}
          />
          {item.connected && (
            <Badge
              status="success"
              containerStyle={{ position: "absolute", top: 0, right: 0 }}
            />
          )}
        </View>
      }
      rightElement={
        <View style={{ width: 25 }}>
          {item.beamData.unreadMessages > 0 && (
            <Badge
              status="primary"
              value={item.beamData.unreadMessages.toString()}
              badgeStyle={{ scaleX: 2.0, scaleY: 2.0 }}
            />
          )}
        </View>
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
          extraData={this.state}
        />
      </ImageBackground>
    );
  }
}

export default BeamCollectionScreen;
