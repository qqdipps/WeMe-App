import axios from "axios";
import Realm from "realm";
import { generateKey } from "./AESfunctions";

export function setupScript(socket, schema, displayName, navigateHome) {
  const params = { user: { setup: true } };
  axios
    .post("http://172.24.27.81:4000/api/users", params, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      const userId = response.data.data.user_id;
      const connectionId = response.data.data.connection_id;
      const linkId = response.data.data.link_id;

      storeUser(schema, connectionId, userId, displayName);
      navigateHome();

      generateKey()
        .then(key => {
          storeKey(schema, key, connectionId);
        })
        .catch(error => console.log(error));

      initializeChannel(socket, connectionId, userId, linkId);
    })
    .catch(error => {
      console.log("HERE I AM IN THE ERROR **********", error);
    });
  return null;
}

const storeUser = (schema, connectionId, userId, displayName) => {
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
};

export function storeKey(schema, key, connectionId) {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
    .then(realm => {
      realm.write(() => {
        realm.create("ConnectAES", {
          connectionId: connectionId,
          encryptionKey: key,
          inUse: false
        });
      });
      console.log(realm.objects("ConnectAES"));
    })
    .catch(error => {
      console.log("****ERROR: key STORE", error);
    });
  Realm.object;
}

const createChannel = (socket, connectionId, userId, linkId) => {
  return socket.channel(`beam:${connectionId}`, {
    connection_id: connectionId,
    user_id: userId,
    link_id: linkId
  });
};

export function initializeChannel(socket, connectionId, userId, linkId) {
  const channel = createChannel(socket, connectionId, userId, linkId);
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

// export function initializeChannel(socket, connectionId, userId, linkId);
// export function storeKey(schema, key, connectionId);
