import React, { Component } from "react";
import Realm from "realm";
import { Text, View } from "react-native";
class TestRealm extends Component {
  constructor(props) {
    super(props);
    this.state = { realm: null };
  }

  componentWillMount() {
    newRealm = [
      {
        name: "UserSelf",
        properties: {
          userId: "int",
          displayName: "string",
          channels: "int?[]"
        }
      },
      {
        name: "ConnectionEncryption",
        properties: {
          connectionId: "int",
          encryptionKey: "string",
          inUse: "bool"
        }
      },
      {
        name: "Message",
        properties: { self: "bool", contents: "string", dateTime: "string" }
      },
      {
        name: "Sender",
        properties: {
          displayName: "string",
          notes: "string?"
        }
      },
      {
        name: "ConnectionMessages",
        properties: {
          connectionId: "int",
          messages: "Message[]",
          sender: "Sender"
        }
      }
    ];
    Realm.open({
      schema: newRealm,
      schemaVersion: 1,
      deleteRealmIfMigrationNeeded: true
      // migration: (this.props.schema, newRealm) => {}
    })
      .then(realm => {
        realm.write(() => {
          realm.deleteAll();
        });
        console.log("deleting realm");
        this.setState({ realm });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return null;
  }
}

export default TestRealm;
