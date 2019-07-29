import axios from "axios";
import Realm from "realm";
import { generateKey } from "./AESfunctions";
import { initializeChannel } from "./weMeConnections";

export function setupScript(
  socket,
  schema,
  displayName,
  navigateHome,
  setUserIdCallback
) {
  const params = { user: { setup: true } };
  axios
    .post(`https://${global.WeMeServerAddress}/api/users`, params, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      const userId = response.data.data.user_id;
      const connectionId = response.data.data.connection_id;
      const linkId = response.data.data.link_id;
      setUserIdCallback(userId);
      storeUser(schema, connectionId, userId, displayName);
      initializeChannel(socket, connectionId, userId, linkId);
      navigateHome();
      generateKey()
        .then(key => {
          storeKey(schema, key, connectionId);
        })
        .catch(error => console.log(error));
    })
    .catch(error => {
      console.log("ERROR  Axios ********** setupScript", error);
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
          console.log("Saving user self", realm.objects("UserSelf"));
        })
        .catch(error => {
          console.log("****ERROR: USER STORE", error);
        });
    }
  );
};

const storeKey = (schema, key, connectionId) => {
  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
    .then(realm => {
      realm.write(() => {
        realm.create("ConnectAES", {
          connectionId: connectionId,
          encryptionKey: key,
          inUse: false
        });
      });
      console.log("Saving connection and key", realm.objects("ConnectAES"));
    })
    .catch(error => {
      console.log("****ERROR: key STORE", error);
    });
  Realm.object;
};
