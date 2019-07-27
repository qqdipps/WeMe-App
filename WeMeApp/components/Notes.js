import React, { Component } from "react";
import { ListItem, Input } from "react-native-elements";
import { View, FlatList, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import SettingBtn from "./SettingBtn";

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
      <View style={styles.view}>
        <Input
          label="Add a note"
          placeholder="..."
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
        <SettingBtn text={"Save"} colors={["white", "#94f5ee"]} />
        <View style={{ height: 150, width: 300 }}>
          <Text>Notes: </Text>
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

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    height: 400
  }
});
