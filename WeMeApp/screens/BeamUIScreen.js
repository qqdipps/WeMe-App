import React, { Component } from "react";
// import { FlatList, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

class BeamUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: undefined
    };
  }

  componentDidMount = () => {
    messages = this.props.beam.map((entry, i) => {
      console.log(entry);
      return {
        _id: i,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: entry.self === true ? 1 : 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any"
        }
      };
    });
    this.setState({ messages: messages });
  };

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1
        }}
      />
    );
  }
}

export default BeamUI;
