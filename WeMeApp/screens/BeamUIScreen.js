import React, { Component } from "react";
import { View } from "react-native";
import { Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
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
      ),
      displayName: beamData.sender.displayName
    };
    this.props.navigation.setParams({
      displayName: beamData.sender.displayName,
      isUser: false,
      notes: beamData.sender.notes,
      connectionId: beamData.connectionId
    });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam("displayName", "garble"),
      headerRight: (
        <View style={{ marginRight: 30 }}>
          <Icon
            name="bars"
            size={30}
            color="white"
            onPress={() => {
              navigation.navigate("ConnectionSettings", {
                displayName: navigation.getParam("displayName", "garble"),
                isUser: navigation.getParam("isUser", true),
                notes: navigation.getParam("notes", ""),
                connectionId: navigation.getParam("connectionId", "")
              });
            }}
          />
        </View>
      )
    };
  };

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

  updateMessages = alert => {
    const { userId, notify } = this.props.navigation.getScreenProps();
    this.state.channel.on("shout", msg => {
      if (userId !== msg.userId) {
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

            const senderDisplayName = realm.objectForPrimaryKey(
              "ConnectionMessages",
              msg.connectionId
            ).sender.displayName;

            notify(senderDisplayName);

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
        name: beamData.sender.displayName
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
          name: beamData.sender.displayName
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
        renderAvatar={() => (
          <Avatar
            size="small"
            rounded
            title={this.state.beamData.sender.displayName
              .substring(0, 2)
              .toUpperCase()}
          />
        )}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: "#009d91"
                },
                left: {
                  backgroundColor: "#D0D7D7"
                }
              }}
            />
          );
        }}
      />
    );
  }
}

export default BeamUIScreen;
