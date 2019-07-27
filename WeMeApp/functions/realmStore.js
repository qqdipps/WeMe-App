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
      notes: "string?[]"
    }
  },
  {
    name: "ConnectionMessages",
    primaryKey: "connectionId",
    properties: {
      connectionId: "int",
      messages: "Message[]",
      sender: "Sender"
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

export function addMessage(connectionId, contents, isSelf) {
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
      });
      console.log("success message added:", contents);
    })
    .catch(error => {
      console.log(" Adding Message ****ERROR: ", error);
    });
}

export function updateSender(connectionId, displayName, notes) {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
    .then(realm => {
      realm.write(() => {
        const connectionMessage = realm
          .objects("ConnectionMessages")
          .filtered(`connectionId == ${connectionId}`)[0];

        connectionMessage.sender.notes = notes;
        connectionMessage.sender.displayName = displayName;
      });
    })
    .catch(error => {
      console.log("****ERROR: ", error);
    });
}

export function deleteMessageHx(connectionId) {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
    .then(realm => {
      realm.write(() => {
        const connectionMessage = realm
          .objects("ConnectionMessages")
          .filtered(`connectionId == ${connectionId}`)[0];
        for (let message of connectionMessage.messages) {
          realm.delete(message);
        }
        const message = realm.create("Message", {
          self: `${isSelf}`,
          contents: `History has been cleared`,
          dateTime: new Date(Date.now()).toString()
        });
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
