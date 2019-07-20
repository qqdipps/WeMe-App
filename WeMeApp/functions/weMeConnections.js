import axios from "axios";
import Realm from "realm";

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
    .post("http://192.168.1.73:4000/api/links", params, {
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
      listenOnChannel(channel, navigationAction);
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

const register = (channel, connectionId, displayName) => {
  channel.push("register", {
    displayName: displayName,
    connectionId: connectionId
  });
  console.log("displayName sent");
};

const listenOnChannel = (channel, navigationAction) => {
  channel.on("shout", msg => {
    console.log("\nGot message from", msg, "->", msg);
  });
  channel.on("register", msg => {
    console.log("\nRegistering New connection: ", msg, "->", msg);
    navigationAction();
  });
};

export function reConnectChannels(connectedChannels, socket) {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true }).then(
    realm => {
      const channels = realm.objects("UserSelf").channels;
      const unconnectedChannels = channels.filter(channel => {
        return !connectedChannels.includes(channel);
      });
    }
  );
  unconnectedChannels
    .forEach(channelId => {
      const channel = socket.channel(`beam:${channelId}`);
      channel
        .join()
        .receive("ok", resp => {
          console.log(
            "Joined successfully channel: ",
            channel.params(),
            channel.params().connection_id
          );
          listenOnChannel(channel, navigationAction);
        })
        .receive("error", resp => {
          console.log("Unable to join", resp);
        });
    })
    .catch(error => {});
}
