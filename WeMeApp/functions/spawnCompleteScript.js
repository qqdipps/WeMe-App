import {
  storeConnectionMessages,
  storeConnectAES,
  addChannelToSelf
} from "../functions/realmStore";
import { generateKey } from "../functions/AESfunctions";
import axios from "axios";
import { initializeChannel } from "../functions/weMeConnections";

export function spawnComplete(
  socket,
  schema,
  connectionId,
  connectionDisplayName
) {
  setInUseConnection(connectionId);
  storeConnectionMessages(connectionDisplayName, connectionId);
  prepNewConnection(socket, schema);
}

prepNewConnection = () => {
  Realm.open({
    schema: schema,
    deleteRealmIfMigrationNeeded: true
  }).then(realm => {
    const userId = realm.objects("UserSelf")[0].userId;
    axios
      .post("http://192.168.1.73:4000/api/connections", params, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        const connectionId = response.data.data.id;
        const params = {
          link: { user_id: userId, connection_id: connectionId }
        };
        axios
          .post("http://192.168.1.73:4000/api/links", params, {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(response => {
            const linkId = response.data.data.id;
            initializeChannel(socket, connectionId, userId, linkId);
            addChannelToSelf(connectionId);
            const key = generateKey();
            storeConnectAES(key, connectionId, inUse);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  });
};
