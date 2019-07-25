import React, { Component } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { addMessage } from "../functions/realmStore";
import { sendMessage, getChannel } from "../functions/weMeConnections";

class BeamUIScreen extends Component {
  constructor(props) {
    super(props);
    const beamData = JSON.parse(this.props.navigation.getParam("beamData", ""));
    this.state = {
      messages: undefined,
      beamData: beamData,
      channel: getChannel(
        JSON.parse(beamData.connectionId),
        this.props.navigation.getScreenProps().socket
      )
    };
  }

  componentDidMount = () => {
    this.loadMessages();
    this.state.channel
      .join()
      .receive("ok", resp => {
        console.log("Joined successfully channel: ", this.state.channel.topic);
        this.updateMessages();
      })
      .receive("error", resp => {
        console.log("Unable to join", resp);
      });
  };

  updateMessages = () => {
    this.state.channel.on("shout", msg => {
      console.log("Message received NOW IN UI:", msg);
      addMessage(msg.connectionId, msg.contents, false);
      const message = this.readMessage(msg);
      const messages = [message];
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages)
      }));
    });
  };

  readMessage = msg => {
    const { beamData, messages } = this.state;
    return {
      _id: Date.now(),
      text: msg.contents.cipher,
      createdAt: new Date(Date.now()),
      user: {
        _id: 2,
        name: beamData.sender.displayName,
        avatar: "https://placeimg.com/140/140/any"
      }
    };
  };

  onSend(messages = []) {
    const { connectionId } = this.state.beamData;
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
    addMessage(connectionId, messages[0].text, true);
    sendMessage(
      this.state.channel,
      connectionId,
      messages[0].text,
      this.props.navigation.getScreenProps().schema
    );
  }

  loadMessages = () => {
    const { beamData } = this.state;
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
    this.setState({ messages: chatUIMessages.reverse() });
  };

  render() {
    console.log("Message sent to GiftedChat:", this.state.messages);
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
