import React, { Component } from "react";
import { ListItem, Input } from "react-native-elements";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import SettingBtn from "./SettingBtn";
import { updateSender, deleteNote } from "../functions/realmStore";

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: this.mapNotes(this.props.notes),
      newNote: undefined,
      // update used to force re-render flatList
      update: true
    };
  }

  mapNotes = notes => {
    console.log(notes);
    return Object.keys(notes).map((key, i) => {
      return { note: notes[key], key: i };
    });
  };

  deleteNoteEntry = item => {
    let notes = this.state.notes;
    console.log("BEFORE RE_index", notes);
    notes = notes
      .filter(entry => entry.key != item.key)
      .map((entry, i) => {
        return { note: entry.note, key: i };
      });
    console.log("AFTER", notes);
    this.setState({ notes: notes, update: !this.state.update });
    deleteNote(this.props.connectionId, item.key);
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.note}
        topDivider
        bottomDivider
        rightIcon={
          <Icon
            name="trash"
            size={40}
            onPress={() => this.deleteNoteEntry(item)}
          />
        }
      />
    );
  };

  saveChanges = () => {
    const notes = this.state.notes;
    const newNote = this.state.newNote;
    if (newNote) {
      notes.push({ note: this.state.newNote, key: notes.length });
      this.setState({ notes: notes, newNote: "", update: !this.state.update });
    }
    this.props.updateCallBack();
    updateSender(this.props.connectionId, this.props.displayName, newNote);
  };

  render() {
    // making deep copy to reverse.
    const notes = JSON.parse(JSON.stringify(this.state.notes));
    console.log("Notes rendered", notes);
    return (
      <KeyboardAvoidingView>
        <View style={styles.view}>
          <Input
            label="Add a Note:"
            placeholder="text here"
            leftIcon={<Icon name="clipboard" size={40} color="black" />}
            leftIconContainerStyle={{ marginRight: 5 }}
            containerStyle={{
              height: 100,
              width: 300
            }}
            value={this.state.newNote}
            onChangeText={text => {
              this.setState({ newNote: text });
            }}
            multiline
            numberOfLines={3}
          />
          <SettingBtn
            callBack={this.saveChanges}
            text={"Save"}
            colors={["white", "#94f5ee"]}
          />
          <View style={{ height: 150, width: 300 }}>
            <Text style={{ fontWeight: "bold", marginLeft: 8 }}>Notes: </Text>
            <FlatList
              nestedScrollEnabled
              keyExtractor={this.keyExtractor}
              data={notes.reverse()}
              renderItem={this.renderItem}
              extraDate={this.state.update}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
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
