import axios from "axios";
import Realm from "realm";
import { addMessage } from "./realmStore";
import { encryptMessage, decryptMessage } from "./AESfunctions";

// used to create connection on capture of QR code.
// get userId and displayName
// post link to api
// register channel (push displayName & connectionID to channel)
// listen on channel (shout and register) w/ actions

export function createConnection(
  connectionId,
  navigationAction,
  schema,
  socket
) {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true }).then(
    realm => {
      const userSelf = realm.objects("UserSelf")[0];
      const userId = userSelf.userId;
      const displayName = userSelf.displayName;
      establishLink(
        connectionId,
        displayName,
        navigationAction,
        schema,
        socket,
        userId
      );
    }
  );
}

const establishLink = (
  connectionId,
  displayName,
  navigationAction,
  schema,
  socket,
  userId
) => {
  const params = { link: { user_id: userId, connection_id: connectionId } };
  axios
    .post(`https://${global.WeMeServerAddress}/api/links`, params, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      const linkId = response.data.data.id;
      registerChannel(
        connectionId,
        displayName,
        linkId,
        navigationAction,
        schema,
        socket,
        userId
      );
    })
    .catch(error => {
      console.log("Post link failed:", error);
    });
};

const registerChannel = (
  connectionId,
  displayName,
  linkId,
  navigationAction,
  schema,
  socket,
  userId
) => {
  const channel = createChannel(connectionId, socket, linkId, userId);
  channel
    .join()
    .receive("ok", resp => {
      console.log(
        "Joined successfully channel: ",
        channel.params(),
        channel.params().connection_id
      );
      register(channel, connectionId, displayName);
      listenOnChannel(channel, schema);
      listenForRegisteringChannel(channel, navigationAction);
    })
    .receive("error", resp => {
      console.log("Unable to join", resp);
    });
};

const createChannel = (connectionId, socket, linkId, userId) => {
  return socket.channel(`beam:${connectionId}`, {
    connection_id: connectionId,
    user_id: userId,
    link_id: linkId
  });
};

export function getChannel(connectionId, socket) {
  const channel = socket.channel(`beam:${connectionId}`);
  return channel;
}

const register = (channel, connectionId, displayName) => {
  const params = {
    displayName: displayName,
    connectionId: connectionId
  };
  channel.push("register", params);
};

const listenOnChannel = (channel, schema) => {
  console.log("listening on channel", channel.topic);
  channel.on("shout", msg => {
    Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
      .then(realm => {
        const key = realm.objectForPrimaryKey("ConnectAES", msg.connectionId)
          .encryptionKey;
        decryptMessage(msg.contents, key)
          .then(message => {
            console.log("Message received:", msg, message);
            addMessage(msg.connectionId, message, false);
          })
          .catch(error => console.log("decryption error: ", error));
      })
      .catch(error => {
        console.log("error getting key: ", error);
      });
  });
};

export function listenForRegisteringChannel(
  channel,
  navigationAction,
  spawnAction
) {
  channel.on("register", msg => {
    console.log("Register response: ", msg);
    if (spawnAction) {
      spawnAction(msg.connectionId, msg.displayName);
    }
    if (navigationAction) {
      navigationAction();
    }
  });
}

export function reConnectChannels(socket, schema, setStateChannels) {
  let stateChannels = [];
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
    .then(realm => {
      const unconnectedChannels = realm.objects("UserSelf")[0].channels;
      console.log("reconnecting channels: ", unconnectedChannels);
      unconnectedChannels.forEach((channelId, i) => {
        const channel = socket.channel(`beam:${channelId}`);
        channel
          .join()
          .receive("ok", resp => {
            console.log("Joined successfully channel: ", channel.topic);
            listenOnChannel(channel);
            stateChannels.push(channel);
            if (i === unconnectedChannels.length - 1) {
              setStateChannels(stateChannels);
            }
          })
          .receive("error", resp => {
            console.log("Unable to join", resp);
          });
      });
    })
    .catch(error => {});
}

export function initializeChannel(socket, connectionId, userId, linkId) {
  const channel = createChannel(connectionId, socket, linkId, userId);
  channel
    .join()
    .receive("ok", resp => {
      console.log("Joined successfully channel: ", channel.topic);
    })
    .receive("error", resp => {
      console.log("Unable to join", resp);
    });
}

export function sendMessage(channel, connectionId, contents, schema, userId) {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
    .then(realm => {
      const key = realm.objectForPrimaryKey("ConnectAES", connectionId)
        .encryptionKey;
      encryptMessage(contents, key)
        .then(encryptedData => {
          channel.push("shout", {
            connectionId: connectionId,
            contents: encryptedData,
            userId: userId
          });
          console.log("Message sent");
        })
        .catch(error => console.log("Encryption Error: ", error));
    })
    .catch(error => {
      console.log("Realm error, getting key", error);
    });
}
