import {
  storeConnectionMessages,
  storeConnectAES,
  addChannelToSelf,
  setInUseConnection
} from "../functions/realmStore";
import { generateKey } from "../functions/AESfunctions";
import axios from "axios";
import { initializeChannel } from "../functions/weMeConnections";

export function spawnComplete(
  socket,
  schema,
  connectionId,
  connectionDisplayName,
  navigateHome
) {
  setInUseConnection(connectionId);
  storeConnectionMessages(connectionDisplayName, connectionId);
  prepNewConnection(socket, schema, navigateHome);
}

const prepNewConnection = (socket, schema, navigateHome) => {
  console.log("Prepping New Connection");
  Realm.open({
    schema: schema,
    deleteRealmIfMigrationNeeded: true
  }).then(realm => {
    const userId = realm.objects("UserSelf")[0].userId;
    console.log("fetch userId self", userId);
    const params = { connection: {} };
    axios
      .post(`http://${global.WeMeServerAddress}/api/connections`, params, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        const connectionId = response.data.data.id;
        console.log("Generating new connectionId: ", connectionId);
        const params = {
          link: { user_id: userId, connection_id: connectionId }
        };
        axios
          .post(`http://${global.WeMeServerAddress}/api/links`, params, {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(response => {
            const linkId = response.data.data.id;
            console.log("New Link and Connection on board");
            initializeChannel(socket, connectionId, userId, linkId);
            addChannelToSelf(connectionId);
            generateKey()
              .then(key => {
                console.log("generated new key", key);
                console.log("connection pair for key", connectionId);
                storeConnectAES(key, connectionId, false);
                navigateHome();
              })
              .catch(error => console.log("Unable to generate key", error));
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log("Error unable to post link:", error);
      });
  });
};
