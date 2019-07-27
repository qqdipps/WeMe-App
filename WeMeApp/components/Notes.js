import React, { Component } from "react";
import { ListItem, Input } from "react-native-elements";
import { View, FlatList, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AddNote from "./AddNote";

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: ["hello", "wow", "so awesome"],
      newNote: ""
    };
  }

  mapNotes = notes => {
    return Object.keys(notes).map(key => notes[key]);
  };

  renderInput = () => {};
  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => {
    return (
      <ListItem
        title={item}
        topDivider
        bottomDivider
        rightIcon={<Icon name="trash" size={40} />}
      />
    );
  };

  render() {
    return (
      <View>
        <Text>Notes: </Text>
        <Input
          placeholder="Add a user note..."
          leftIcon={<Icon name="clipboard" size={40} color="black" />}
          leftIconContainerStyle={{ marginRight: 5 }}
          containerStyle={{
            height: 100,
            width: 300
          }}
          onChangeText={text => {
            this.setState({ newNote: text });
          }}
        />
        <AddNote />
        <View style={{ height: 150 }}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.notes}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}

export default Notes;
