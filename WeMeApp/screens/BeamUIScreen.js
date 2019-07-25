import React, { Component } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { addMessage } from "../functions/realmStore";
import { sendMessage, getChannel } from "../functions/weMeConnections";
import { decryptMessage } from "../functions/AESfunctions";

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
      if (this.props.navigation.getScreenProps().userId !== msg.userId) {
        console.log("HERE IS MY NEW MESSAGE=>, ", msg, "YOYOYOYOYOYO");
        Realm.open({
          schema: this.props.navigation.getScreenProps().schema,
          deleteRealmIfMigrationNeeded: true
        })
          .then(realm => {
            const key = realm.objectForPrimaryKey(
              "ConnectAES",
              msg.connectionId
            ).encryptionKey;

            decryptMessage(msg.contents, key)
              .then(message => {
                console.log("Message received in chat UI:", msg, message);
                addMessage(msg.connectionId, message, false);
                const messages = [this.readMessage(message)];
                console.log("HERE IS MY NEW MESSAGE=>, ", messages);
                this.setState(previousState => ({
                  messages: GiftedChat.append(previousState.messages, messages)
                }));
              })
              .catch(error =>
                console.log("decryption error: in beamUI", error)
              );
          })
          .catch(error => {
            console.log("error getting key: ", error);
          });
      }
    });
  };

  readMessage = msg => {
    const { beamData, messages } = this.state;
    return {
      _id: Date.now(),
      text: msg,
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
      this.props.navigation.getScreenProps().schema,
      this.props.navigation.getScreenProps().userId
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
