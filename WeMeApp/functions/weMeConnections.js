import axios from "axios";
import Realm from "realm";
import { addMessage } from "./realmStore";

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
  socket,
  userId
) => {
  const params = { link: { user_id: userId, connection_id: connectionId } };
  axios
    .post(`http://${global.WeMeServerAddress}/api/links`, params, {
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
  socket,
  userId
) => {
  const channel = createChannel(connectionId, linkId, socket, userId);
  channel
    .join()
    .receive("ok", resp => {
      console.log(
        "Joined successfully channel: ",
        channel.params(),
        channel.params().connection_id
      );
      register(channel, connectionId, displayName);
      listenOnChannel(channel);
      listenForRegisteringChannel(channel, navigationAction);
    })
    .receive("error", resp => {
      console.log("Unable to join", resp);
    });
};

const createChannel = (connectionId, linkId, socket, userId) => {
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

const listenOnChannel = channel => {
  console.log("listening on channel", channel.topic);
  channel.on("shout", msg => {
    console.log("Message received:", msg);
    addMessage(msg.connectionId, msg.contents, false);
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

export function reConnectChannels(socket, schema) {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
    .then(realm => {
      const unconnectedChannels = realm.objects("UserSelf")[0].channels;
      console.log("reconnecting channels: ", unconnectedChannels);
      unconnectedChannels.forEach(channelId => {
        const channel = socket.channel(`beam:${channelId}`);
        channel
          .join()
          .receive("ok", resp => {
            console.log("Joined successfully channel: ", channel.topic);
            listenOnChannel(channel);
          })
          .receive("error", resp => {
            console.log("Unable to join", resp);
          });
      });
    })
    .catch(error => {});
}

export function initializeChannel(socket, connectionId, userId, linkId) {
  const channel = createChannel(connectionId, linkId, socket, userId);
  channel
    .join()
    .receive("ok", resp => {
      console.log(
        "Joined successfully channel: ",
        channel.params(),
        channel.params().connection_id
      );
    })
    .receive("error", resp => {
      console.log("Unable to join", resp);
    });
}
