import axios from "axios";
import Realm from "realm";

export function createConnection(connectionId, schema, socket) {
  console.log(schema);
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true }).then(
    realm => {
      const userSelf = realm.objects("UserSelf")[0];
      const userId = userSelf.userId;
      const displayName = userSelf.displayName;
      postLink(connectionId, displayName, socket, userId);
    }
  );
}

const postLink = (connectionId, displayName, socket, userId) => {
  const params = { link: { user_id: userId, connection_id: connectionId } };
  axios
    .post("http://192.168.1.12:4000/api/links", params, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      const linkId = response.data.data.id;
      initializeChannel(connectionId, displayName, linkId, socket, userId);
    })
    .catch(error => {
      console.log("Post link failed:", error);
    });
};

const initializeChannel = (
  connectionId,
  displayName,
  linkId,
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
      channel.push("register", { displayName: displayName });
      console.log("displayName sent");
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

const shareDisplayName = (connectionId, schema, socket) => {
  console.log("TRYING TO PUSH MESSAGEs");
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
    .then(realm => {
      const userSelf = realm.objects("UserSelf")[0];
      const channel = socket.channel(`beam:${connectionId}`);
      channel.push("connect", { displayName: userSelf.displayName });
      console.log("displayName sent");
    })
    .catch(error => console.log(error));
};
