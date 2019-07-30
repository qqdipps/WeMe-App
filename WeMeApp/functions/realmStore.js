import Realm from "realm";

const schema = [
  {
    name: "UserSelf",
    properties: {
      userId: "int",
      displayName: "string",
      channels: "int?[]"
    }
  },
  {
    name: "ConnectAES",
    primaryKey: "connectionId",
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
      notes: "string?[]",
      connected: { type: "bool", default: true }
    }
  },
  {
    name: "ConnectionMessages",
    primaryKey: "connectionId",
    properties: {
      connectionId: "int",
      messages: "Message[]",
      sender: "Sender",
      unreadMessages: { type: "int", default: 0 }
    }
  }
];

export function storeUserSelf(connectionId, userId, displayName) {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
    .then(realm => {
      realm.write(() => {
        realm.deleteAll();
        const user = realm.create("UserSelf", {
          userId: userId,
          displayName: displayName
        });
        user.channels.push(connectionId);
        console.log("Storing user self", realm.objects("UserSelf"));
      });
    })
    .catch(error => {
      console.log("****ERROR: ", error);
    });
}

export function storeConnectAES(key, connectionId, inUse) {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
    .then(realm => {
      realm.write(() => {
        realm.create("ConnectAES", {
          connectionId: connectionId,
          encryptionKey: key,
          inUse: inUse
        });
      });
      console.log("Storing connection and key", realm.objects("ConnectAES"));
    })
    .catch(error => {
      console.log("****ERROR: ", error);
    });
}

export function storeSender(displayName) {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
    .then(realm => {
      realm.write(() => {
        const sender = realm.create("Sender", {
          displayName: displayName
        });
        sender.notes.push(
          `Connected on ${new Date(Date.now()).toLocaleDateString()}`
        );
      });
      console.log("storing sender", realm.objects("Sender"));
    })
    .catch(error => {
      console.log("****ERROR: Sender Store", error);
    });
}

export function storeConnectionMessages(displayName, connectionId) {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
    .then(realm => {
      realm.write(() => {
        const sender = realm.create("Sender", {
          displayName: displayName
        });
        sender.notes.push(
          `Connected on ${new Date(Date.now()).toLocaleDateString()}`
        );

        const message = realm.create("Message", {
          self: true,
          contents: "New Connection!",
          dateTime: new Date(Date.now()).toString()
        });
        const connection = realm.create("ConnectionMessages", {
          connectionId: connectionId,
          sender: sender
        });
        connection.messages.push(message);
        console.log("Success: stored ConnectionMessages", connection);
      });
    })
    .catch(error => {
      console.log("****ERROR: ConnectionMessages Store", error);
    });
}

export function addMessage(
  connectionId,
  contents,
  isSelf,
  incrementUnread = false
) {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
    .then(realm => {
      const connectionMessage = realm
        .objects("ConnectionMessages")
        .filtered(`connectionId == ${connectionId}`)[0];
      realm.write(() => {
        const message = realm.create("Message", {
          self: isSelf,
          contents: `${contents}`,
          dateTime: new Date(Date.now()).toString()
        });
        connectionMessage.messages.push(message);
        if (incrementUnread) {
          connectionMessage.unreadMessages += 1;
        }
        console.log(connectionMessage.unreadMessages);
      });
      console.log("success message added:", contents);
    })
    .catch(error => {
      console.log(" Adding Message ****ERROR: ", error);
    });
}

export function updateSender(connectionId, displayName, note) {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
    .then(realm => {
      realm.write(() => {
        const connectionMessages = realm.objectForPrimaryKey(
          "ConnectionMessages",
          connectionId
        );
        if (displayName) {
          connectionMessages.sender.displayName = displayName;
        }
        if (note) {
          connectionMessages.sender.notes.push(note);
        }
      });
    })
    .catch(error => {
      console.log("****ERROR: updating sender notes or displayName", error);
    });
}

export function deleteMessageHx(connectionId) {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
    .then(realm => {
      realm.write(() => {
        const connectionMessages = realm.objectForPrimaryKey(
          "ConnectionMessages",
          connectionId
        );
        const messages = connectionMessages.messages;
        realm.delete(messages);

        const message = realm.create("Message", {
          self: true,
          contents: `History has been cleared`,
          dateTime: new Date(Date.now()).toString()
        });
        messages.push(message);
      });
    })
    .catch(error => {
      console.log("****ERROR: ", error);
    });
}

export function storeConnectionData(displayName, connectionId, key, inUse) {
  let inRealm;
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
    .then(realm => {
      const inAes =
        realm.objects("ConnectAES").filtered(`connectionId == ${connectionId}`)
          .length != 0;

      const inConnectionMessages =
        realm
          .objects("ConnectionMessages")
          .filtered(`connectionId == ${connectionId}`).length != 0;

      inRealm = inAes || inConnectionMessages;
      if (!inRealm) {
        storeConnectionMessages(displayName, connectionId);
        storeConnectAES(key, connectionId, inUse);
        addChannelToSelf(connectionId);
        console.log("storing new connection data");
      } else {
        console.log("connection error: users already appeared to be connected");
      }
    })
    .catch(error => {
      console.log("****ERROR: ", error);
    });
}

export function addChannelToSelf(connectionId) {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
    .then(realm => {
      realm.write(() => {
        const userSelf = realm.objects("UserSelf")[0];
        userSelf.channels.push(connectionId);
        console.log("Adding channel to self", userSelf);
      });
    })
    .catch(error => {
      console.log("****ERROR: ", error);
    });
}

export function setInUseConnection(connectionId) {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
    .then(realm => {
      realm.write(() => {
        const connection = realm.create(
          "ConnectAES",
          { connectionId: connectionId, inUse: true },
          true
        );
        console.log("Set connection in use to true ", connection);
      });
    })
    .catch(error => {
      console.log("****ERROR: Setting connection in use to true", error);
    });
}

export function addNote(connectionId, note) {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
    .then(realm => {
      realm.write(() => {
        const connectionMessages = realm.objectForPrimaryKey(
          "ConnectionMessages",
          connectionId
        );
        connectionMessages.sender.notes.push(note);
        console.log("note added: ", connectionMessages.sender.notes);
      });
    })
    .catch(error => console.log("error saving note in realm", error));
}

export function deleteNote(connectionId, noteKey) {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true }).then(
    realm => {
      const sender = realm.objectForPrimaryKey(
        "ConnectionMessages",
        connectionId
      ).sender;

      const notes = Object.keys(sender.notes)
        .map(key => sender.notes[key])
        .filter((note, i) => {
          return i != noteKey;
        });
      realm.write(() => {
        realm.delete(sender.notes);
        notes.forEach(note => {
          sender.notes.push(note);
        });
      });
    }
  );
}

export function resetUnreadMessages(connectionId) {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
    .then(realm => {
      realm.write(() => {
        const connectionMessages = realm.objectForPrimaryKey(
          "ConnectionMessages",
          connectionId
        );
        connectionMessages.unreadMessages = 0;
      });
    })
    .catch(error => console.log("Error resetting unread Messages", error));
}

export function getKey(setKey, connectionId) {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true }).then(
    realm => {
      const key = realm.objectForPrimaryKey("ConnectAES", connectionId)
        .encryptionKey;
      console.log("KEY IN GET KEY", key);
      setKey(key);
    }
  );
}

export function updateUserDisplayName(displayName) {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
    .then(realm => {
      realm.write(() => {
        const userSelf = realm.objects("UserSelf")[0];
        userSelf.displayName = displayName;
      });
    })
    .catch(error => console.log("Unable to update user display, realm", error));
}
