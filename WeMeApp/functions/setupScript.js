import axios from "axios";
import Realm from "realm";
import { generateKey } from "./AESfunctions";
import { initializeChannel } from "./weMeConnections";

export function setupScript(schema, displayName, navigateHome) {
  const params = { user: { setup: true } };
  axios
    .post(`http://${global.WeMeServerAddress}/api/users`, params, {
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
    })
    .catch(error => {
      console.log("HERE I AM IN THE ERROR ********** setupScript", error);
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
