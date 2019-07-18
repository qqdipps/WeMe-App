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

export function storeUserSelf(connectionId, userId, displayName) {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true }).then(
    realm => {
      realm
        .write(() => {
          realm.deleteAll();
          const user = realm.create("UserSelf", {
            userId: userId,
            displayName: displayName
          });
          user.channels.push(connectionId);
          console.log(realm.objects("UserSelf"));
        })
        .catch(error => {
          console.log("****ERROR: USER STORE", error);
        });
    }
  );
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
      console.log(realm.objects("ConnectAES"));
    })
    .catch(error => {
      console.log("****ERROR:ConnectAES STORE", error);
    });
  Realm.object;
}

export function storeSender(displayName) {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
    .then(realm => {
      realm.write(() => {
        realm.create("Sender", {
          displayName: displayName,
          notes: `Connected on ${new Date(Date.now()).toLocaleDateString()}`
        });
      });
      console.log(realm.objects("Sender"));
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
          displayName: displayName,
          notes: `Connected on ${new Date(Date.now()).toLocaleDateString()}`
        });

        const message = realm.create("Message", {
          self: "true",
          contents: "New Connection!",
          dateTime: JSON.stringify({
            date: new Date(Date.now()).toDateString(),
            time: new Date(Date.now()).toDateString()
          })
        });
        const connection = realm.create("ConnectionMessages", {
          connectionId: connectionId,
          sender: sender
        });
        connection.messages.push(message);
      });
      console.log(realm.objects("Sender"));
    })
    .catch(error => {
      console.log("****ERROR: ConnectionMessages Store", error);
    });
}

export function addMessage(connectionId, contents, isSelf) {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true }).then(
    realm => {
      realm.write(() => {
        const connectionMessage = realm
          .objects("ConnectionMessages")
          .filtered(`connectionId == ${connectionId}`)[0];
        const message = realm.create("Message", {
          self: `${isSelf}`,
          contents: `${contents}`,
          dateTime: JSON.stringify({
            date: new Date(Date.now()).toDateString(),
            time: new Date(Date.now()).toDateString()
          })
        });
        connectionMessage.messages.push(message);
      });
    }
  );
}

export function updateSender(connectionId, displayName, notes) {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true }).then(
    realm => {
      realm.write(() => {
        const connectionMessage = realm
          .objects("ConnectionMessages")
          .filtered(`connectionId == ${connectionId}`)[0];

        connectionMessage.sender.notes = notes;
        connectionMessage.sender.displayName = displayName;
      });
    }
  );
}

export function deleteMessageHx(connectionId) {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true }).then(
    realm => {
      realm.write(() => {
        const connectionMessage = realm
          .objects("ConnectionMessages")
          .filtered(`connectionId == ${connectionId}`)[0];
        for (let message of connectionMessage.messages) {
          realm.delete(message);
        }
        // add a message about hx cleared locally
      });
    }
  );
}
