import React, { Component } from "react";
// import { FlatList, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { addMessage } from "../functions/realmStore";

class BeamUIScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: undefined,
      beamData: JSON.parse(this.props.navigation.getParam("beamData", ""))
    };
  }

  componentDidMount = () => {
    const { beamData } = this.state;
    console.log("BeamData read from params:", beamData);
    const chatUIMessages = Object.keys(beamData.messages).map((key, i) => {
      return {
        _id: i,
        text: beamData.messages[key].contents,
        createdAt: new Date(beamData.messages[key].dateTime),
        user: {
          _id: beamData.messages[key].self === true ? 1 : 2,
          name: beamData.sender.displayName,
          avatar: "https://placeimg.com/140/140/any"
        }
      };
    });
    this.setState({ messages: chatUIMessages });
  };

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
    console.log(messages);
    addMessage(this.state.beamData.connectionId, messages[0].text, true);
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

export default BeamUIScreen;
